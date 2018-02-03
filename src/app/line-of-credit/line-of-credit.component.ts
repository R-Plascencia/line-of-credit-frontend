import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { LineOfCredit } from './line-of-credit';
import { LineOfCreditService } from './line-of-credit.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-line-of-credit',
  templateUrl: './line-of-credit.component.html',
  styleUrls: ['./line-of-credit.component.css']
})
export class LineOfCreditComponent implements OnInit {
  loc: LineOfCredit;
  showSpinner = false;
  errorMsg = '';

  constructor(
    private lineOfCreditService: LineOfCreditService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
    // (+) converts string 'id' to a number
    .switchMap((params: Params) => this.lineOfCreditService.getLineOfCreditById(+params['id']))
    .subscribe((product) => this.loc = product);
  }

}
