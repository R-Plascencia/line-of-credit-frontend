import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';


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

    getTokenPayload(token: string): string {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    // Kill token when user logs out
    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('id');
    }

    login(email: string, password: string): Observable<boolean> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        // Compiler doesn't like the {headers...} here, but it doesn't work without it
        return this.http.post(this.authUrl, JSON.stringify({auth: {email:email, password:password} }), options).map( (res: Response) => {
            // Success!
            let token = res.json() && res.json().jwt;
            var id = this.getTokenPayload(token).sub.toString();

            if (token) {
                this.token = token;

                localStorage.setItem('currentUser', JSON.stringify({
                    email: email,
                    token: token,
                }));
                localStorage.setItem('id', id);

                return true;
            }
            else {
                // Login fail
                console.error('LOGIN FAIL');
                return false;
            }
        })
        .catch(this.handleError);
    }

    handleError() {
        return Observable.of(false);
    }

}

