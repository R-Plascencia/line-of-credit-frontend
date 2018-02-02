import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loadUsers();
    console.log(this.loadUsers());
    console.log(this.users);
  }

  loadUsers(){
    return this.userService.getUsers()
      .subscribe(resUsers => this.users = resUsers);
  }

}
