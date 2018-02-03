import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;

  constructor(
    private userService: UserService
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

}
