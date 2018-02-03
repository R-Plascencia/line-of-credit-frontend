import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule }    from '@angular/forms';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserService } from './user/user.service'
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './authentication/authentication.service';
import { HomeComponent } from './home/home.component';
import { LineOfCreditService } from './line-of-credit/line-of-credit.service';
import { LineOfCreditComponent } from './line-of-credit/line-of-credit.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    HomeComponent,
    LineOfCreditComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    UserService,
    AuthenticationService,
    LineOfCreditService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
