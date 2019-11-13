import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeveloperLoginComponent } from './developer/developer-login/developer-login.component';
import { DeveloperDashboardComponent } from './developer/developer-dashboard/developer-dashboard.component';
import { HomeComponent } from './home/home.component';
import { AdminauthGuard } from './_guards/adminauth.guard';
import { AddCompanyComponent } from './developer/developer-dashboard/add-company/add-company.component';


export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'home', component: HomeComponent},
    { path: 'developer-login', component: DeveloperLoginComponent},
    { path: 'dashboard', component: DashboardComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AdminauthGuard],
        children: [
            { path: 'developer-dashboard', component: DeveloperDashboardComponent }
        ]

    },

    { path: '**', redirectTo: '', pathMatch: 'full'}
];
