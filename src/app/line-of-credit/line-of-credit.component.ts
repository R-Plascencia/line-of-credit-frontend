import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LineOfCredit } from './line-of-credit';
import { LineOfCreditService } from './line-of-credit.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { WithdrawalService } from '../withdrawals/withdrawal.service';
import { PaymentService } from '../payment/payment.service';
import { Withdrawal } from '../withdrawals/withdrawal';
import { Payment } from '../payment/payment';


@Component({
  selector: 'app-line-of-credit',
  templateUrl: './line-of-credit.component.html',
  styleUrls: ['./line-of-credit.component.css']
})

export class LineOfCreditComponent implements OnInit {
  loc: LineOfCredit;
  withdrawals: Withdrawal[];
  payments: Payment[];
  showPaymentSpinner = false;
  showWithdrawalSpinner = false;
  errorMsg = '';

  constructor(
    private lineOfCreditService: LineOfCreditService,
    private withdrawalService: WithdrawalService,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
    // (+) converts string 'id' to a number
    .switchMap((params: Params) => this.lineOfCreditService.getLineOfCreditById(+params['id']))
    .subscribe((product) => {
      if (product === false) {
        this.router.navigate(['page-401']);
      }

      this.loc = product;
      this.getAllWithdrawals();
      this.getAllPayments();
    });
  }

  doDraw(form: NgForm) {
    this.showWithdrawalSpinner = true;

    console.log(form.value);
    this.withdrawalService.withdrawOnLineById(this.loc.id, form.value)
      .subscribe(result => {
        if (result === true){
          console.log('Withdrawal Success!');
          location.reload();
        }
        else {
          this.showWithdrawalSpinner = false;
          this.errorMsg = 'Withdrawal failed.'
          console.error('Creating new withdrawal failed');
        }
      });
  }

  deleteCreditLine(id: number) {
    if (this.loc.principal_bal > 0) {
      this.errorMsg = 'You cannot delete a line of credit with an outstanding balance.'
    }
    else {
      this.lineOfCreditService.deleteLineOfCredit(id)
      .subscribe(result => {
        if (result === true) {
          console.log('Credit Line deleted!');
          this.router.navigate(['home']);
        }
        else {
          this.errorMsg = 'The deletion failed, try again later!'
          console.error('Deleted LoC failed');
        }
      });
    }
  }

  makePayment(form: NgForm) {
    this.showPaymentSpinner = true;

    console.log(form.value);
    this.paymentService.makePaymentToLineById(this.loc.id, form.value)
      .subscribe(result => {
        if (result === true){
          console.log('Payment Success!');
          location.reload();
        }
        else {
          this.showPaymentSpinner = false;
          this.errorMsg = 'Payment failed';
          console.error('Making payment failed');
        }
      });
  }

  getAllWithdrawals() {
    console.log('Getting all withdrawals for activity log...');

    this.withdrawalService.getAllWithdrawalsByLineId(this.loc.id)
      .subscribe(withdrawals => this.withdrawals = withdrawals);
  }

  getAllPayments() {
    console.log('Getting all payments for activity log...');

    this.paymentService.getAllPaymentsByLineId(this.loc.id)
      .subscribe(payments => this.payments = payments);
  }

  resetErrors() {
    this.errorMsg = '';
  }

}
