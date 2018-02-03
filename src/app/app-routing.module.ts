import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { AuthProtect } from './authentication/auth.protect';
import { HomeComponent } from './home/home.component';
import { LineOfCreditComponent } from './line-of-credit/line-of-credit.component';


const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthProtect] },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthProtect] },
    { path: 'line-of-credit/:id', component: LineOfCreditComponent, canActivate: [AuthProtect] },
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {

}
