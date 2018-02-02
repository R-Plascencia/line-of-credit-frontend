import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    public token: string;
    private authUrl = 'http://localhost:3000/user_token';

    constructor(
        private http: Http
    ) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    // Kill token when user logs out
    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    login(email: string, password: string): Observable<boolean> {
        console.log(JSON.stringify({auth:{email:email,password:password}}));

        // Compiler doesn't like the {headers...} here, but it doesn't work without it :/
        // no time to further troubleshoot
        return this.http.post(this.authUrl, JSON.stringify({auth: {email:email, password:password} }), {headers:{'Content-Type': 'application/json'})
            .map( (res: Response) => {
            // Success!
            let token = res.json() && res.json().jwt;

            if (token) {
                this.token = token;

                localStorage.setItem('currentUser', JSON.stringify({
                    email: email,
                    password: password
                }));

                return true;
            }
            else {
                // Login fail
                console.error('LOGIN FAIL');
                return false;
            }
        });
    }
}

