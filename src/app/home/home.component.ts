import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { User } from '../user/user';
import { NgForm } from '@angular/forms';
import { LineOfCreditService } from '../line-of-credit/line-of-credit.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User;
  showSpinner = false;
  errorMsg = '';
 
  constructor(
    private userService: UserService,
    private lineOfCreditService: LineOfCreditService
  ) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser(){
    let userId = localStorage.getItem('id');
    console.log(userId);
    
    return this.userService.getUser(userId)
      .subscribe(resUser => this.user = resUser);
  }

  createLineOfCredit(form: NgForm) {
    if (form.value.apr < 0 || form.value.credit_limit < 0) {
      this.errorMsg = 'Number values cannot be less than 0.'
    }
    else {
      this.showSpinner = true;
      this.lineOfCreditService.createNewLineOfCredit(form.value)
        .subscribe(result => {
          if (result === true) {
            console.log('Created new LOC!')
            location.reload();
          }
          else {
            this.showSpinner = false;
            this.errorMsg = 'Login failed. Please check email or password and try again.'
            console.error('Creating new LoC failed');
          }
        });
    }
  }

  resetErrorMsg() {
    this.errorMsg = '';
  }
}
