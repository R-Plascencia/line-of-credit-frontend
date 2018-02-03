import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { LineOfCredit } from '../line-of-credit/line-of-credit';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { LineOfCreditService } from '../line-of-credit/line-of-credit.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { Payment } from './payment';

@Injectable()
export class PaymentService {
  private userId = localStorage.getItem('id');
  private apiUrl = `http://localhost:3000/api/users/${this.userId}/credit_lines/`;

  constructor(
    private lineOfCreditService: LineOfCreditService,
    private authenticationService: AuthenticationService,
    private http: Http
  ) { }

  getAllPaymentsByLineId(loc_id: number): Observable<Payment[]> {
    let apiRoute = this.apiUrl + loc_id + '/payments'

    // add authorization header with jwt token
    let jwtToken = this.authenticationService.token;
    let headers = new Headers({ 'Authorization': 'Bearer ' + jwtToken, 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(apiRoute, options)
    .map((response: Response) => response.json());
  }

  makePaymentToLineById(loc_id: number, formValue: string): Observable<boolean> {
    let apiRoute = this.apiUrl + loc_id + '/payments'

    // add authorization header with jwt token
    let jwtToken = this.authenticationService.token;
    let headers = new Headers({ 'Authorization': 'Bearer ' + jwtToken, 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(apiRoute, JSON.stringify({credit_line_id: loc_id, amount: formValue['payment']}), options)
    .map((response: Response) => {
      return true;
    })
    .catch(this.handleError);
  }

  handleError() {
    return Observable.of(false);
  }

}
