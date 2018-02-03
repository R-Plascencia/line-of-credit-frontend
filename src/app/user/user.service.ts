import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from './user';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class UserService {
    private userUrl = 'http://localhost:3000/api/users/';

    constructor(
        private http:Http,
        private authenticationService: AuthenticationService
    ) {}

    getUser(id: string): Observable<User> 
    {
        // add authorization header with jwt token
        let jwtToken = this.authenticationService.token;
        let headers = new Headers({ 'Authorization': 'Bearer ' + jwtToken });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.userUrl + id, options)
        .map((response: Response) => response.json());
    }

}

