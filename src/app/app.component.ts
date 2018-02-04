import { Component } from '@angular/core';
import { UserService } from './user/user.service';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AuthenticationService } from './authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Line of Credit App';

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ){}

  hideNav() {
    if (this.router.url === '/page-401') {
      console.log('This is the 401 page');
      return true;
    } else {
      return false;
    }
  }
}
