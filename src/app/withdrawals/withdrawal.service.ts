import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { LineOfCredit } from '../line-of-credit/line-of-credit';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { LineOfCreditService } from '../line-of-credit/line-of-credit.service';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class WithdrawalService {
  private userId = localStorage.getItem('id');
  private apiUrl = `http://localhost:3000/api/users/${this.userId}/credit_lines/`;

  constructor(
    private lineOfCreditService: LineOfCreditService,
    private authenticationService: AuthenticationService,
    private http: Http
  ) { }

  withdrawOnLineById(loc_id:number, formValue: string): Observable<boolean>{
    let apiRoute = this.apiUrl + loc_id + '/withdrawals'

    // add authorization header with jwt token
    let jwtToken = this.authenticationService.token;
    let headers = new Headers({ 'Authorization': 'Bearer ' + jwtToken, 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(apiRoute, JSON.stringify({credit_line_id: loc_id, amount: formValue['drawamt']}), options)
      .map((response: Response) => {
        return true;
      })
      .catch(this.handleError);
  }

  handleError() {
    return Observable.of(false);
  }

}
