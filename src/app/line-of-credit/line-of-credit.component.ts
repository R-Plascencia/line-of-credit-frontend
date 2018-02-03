import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LineOfCredit } from './line-of-credit';
import { LineOfCreditService } from './line-of-credit.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { WithdrawalService } from '../withdrawals/withdrawal.service';


@Component({
  selector: 'app-line-of-credit',
  templateUrl: './line-of-credit.component.html',
  styleUrls: ['./line-of-credit.component.css']
})

export class LineOfCreditComponent implements OnInit {
  loc: LineOfCredit;
  showSpinner = false;
  errorMsg = '';

  constructor(
    private lineOfCreditService: LineOfCreditService,
    private withdrawalService: WithdrawalService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
    // (+) converts string 'id' to a number
    .switchMap((params: Params) => this.lineOfCreditService.getLineOfCreditById(+params['id']))
    .subscribe((product) => this.loc = product);
  }

  doDraw(form: NgForm) {
    this.showSpinner = true;

    console.log(form.value);
    this.withdrawalService.withdrawOnLineById(this.loc.id, form.value)
      .subscribe(result => {
        if (result === true){
          console.log('Withdrawal Success!');
          location.reload();
        }
        else {
          this.showSpinner = false;
          this.errorMsg = 'Withdrawal failed.'
          console.error('Creating new withdrawal failed');
        }
      });
  }

}
