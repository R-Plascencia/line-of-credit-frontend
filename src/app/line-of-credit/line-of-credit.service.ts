import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from '../user/user';
import { LineOfCredit } from './line-of-credit';

@Injectable()
export class LineOfCreditService {

  private apiUrl = 'http://localhost:3000/api/users/';
  private userId = localStorage.getItem('id');

  constructor(
    private http: Http,
    private authenticationService: AuthenticationService
  ) { }

  createNewLineOfCredit(formValue: string): Observable<boolean> {
    let apiRoute = this.apiUrl + this.userId + '/credit_lines';

    // Convert APR to decimal
    formValue['apr'] = formValue['apr']/100
    console.log(JSON.stringify(formValue));

    // add authorization header with jwt token
    let jwtToken = this.authenticationService.token;
    let headers = new Headers({ 'Authorization': 'Bearer ' + jwtToken, 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(apiRoute, JSON.stringify(formValue), options)
      .map((response: Response) => {
        return true;
      })
      .catch(this.handleError);
  }

  deleteLineOfCredit(id: number): Observable<boolean> {
    let apiRoute = this.apiUrl + this.userId + '/credit_lines/' + id;

    // add authorization header with jwt token
    let jwtToken = this.authenticationService.token;
    let headers = new Headers({ 'Authorization': 'Bearer ' + jwtToken, 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(apiRoute, options)
      .map((response: Response) => {
        return true;
      })
      .catch(this.handleError);
  }

  getLineOfCreditById(id: number): Observable<LineOfCredit> {
    let apiRoute = this.apiUrl + this.userId + '/credit_lines/' + id

    // add authorization header with jwt token
    let jwtToken = this.authenticationService.token;
    let headers = new Headers({ 'Authorization': 'Bearer ' + jwtToken, 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(apiRoute, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  handleError() {
    return Observable.of(false);
  }
}
