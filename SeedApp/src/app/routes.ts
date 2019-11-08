import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeveloperLoginComponent } from './developer/developer-login/developer-login.component';
 


export const appRoutes: Routes = [
    { path: '', component: DashboardComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'developer-login', component: DeveloperLoginComponent},

    { path: '**', redirectTo: '', pathMatch: 'full'}
];
