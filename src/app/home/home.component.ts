import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { User } from '../user/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User;
 
  constructor(private userService: UserService) { }

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
