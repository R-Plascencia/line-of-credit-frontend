import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { AuthProtect } from './authentication/auth.protect';
import { HomeComponent } from './home/home.component';
import { LineOfCreditComponent } from './line-of-credit/line-of-credit.component';
import { Page401Component } from './page-401/page-401.component';


const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthProtect] },
    { path: 'line-of-credit/:id', component: LineOfCreditComponent, canActivate: [AuthProtect] },
    { path: 'page-401', component: Page401Component },
    { path: '**', redirectTo: 'home' }
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {

}
