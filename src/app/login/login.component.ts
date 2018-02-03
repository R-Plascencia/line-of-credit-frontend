import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showSpinner = false;
  errorMsg = '';
  user: any = {};

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  // Just log out if we get here
  ngOnInit() {
    this.authenticationService.logout();
  }

  login() {
    this.showSpinner = true;
    this.authenticationService.login(this.user.email, this.user.password)
      .subscribe(result => {
        if (result === true) {
          this.router.navigate(['home']);
        }
        else {
          this.showSpinner = false;
          this.errorMsg = 'Login failed. Please check email or password and try again.'
        }
      });
  }

}
