import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user/user-list.component';
import { LoginComponent } from './login/login.component';
import { AuthProtect } from './authentication/auth.protect';


const routes: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UserListComponent }
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {

}
