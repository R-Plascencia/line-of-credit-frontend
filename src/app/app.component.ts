import { Component } from '@angular/core';
import { UserService } from './user/user.service';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AuthenticationService } from './authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Line of Credit App';

  constructor(
    private authService: AuthenticationService
  ){}

  // notLoggedIn() {
  //   this.isLoggedIn = this.userService.currentUserPresent();
  // }
}
