import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthProtect implements CanActivate {
    constructor(
        private router: Router
    ){}

    // Check if logged in and can access page or not
    canActivate() {
        if (localStorage.getItem('currentUser') && localStorage.getItem('id')) {
            this.router.navigate(['home']);
            return true;
        } 
        else {
            this.router.navigate(['login']);
            return false;
        }
    }
}