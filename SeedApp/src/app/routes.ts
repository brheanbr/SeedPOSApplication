import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeveloperLoginComponent } from './developer/developer-login/developer-login.component';
import { DeveloperDashboardComponent } from './developer/developer-dashboard/developer-dashboard.component';
import { HomeComponent } from './home/home.component';
import { AdminauthGuard } from './_guards/adminauth.guard';
import { AddCompanyComponent } from './developer/developer-dashboard/add-company/add-company.component';
import { DeveloperDashboardResolver } from './_resolver/developer-dashboard.resolver';
import { CompanyLoginComponent } from './company/company-login/company-login.component';
import { LoginGuard } from './_guards/login.guard';
import { CompanyLoginGuard } from './_guards/companylogin.guard';
import { CompanyauthGuard } from './_guards/companyauth.guard';


export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'home', component: HomeComponent},
    {
        path: 'developer-login', component: DeveloperLoginComponent,
        runGuardsAndResolvers: 'always',
        canActivate: [LoginGuard]
    },
    {
        path: 'company-login', component: CompanyLoginComponent,
        runGuardsAndResolvers: 'always',
        canActivate: [CompanyLoginGuard]
    },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AdminauthGuard],
        children: [
            { path: 'developer-dashboard', component: DeveloperDashboardComponent, resolve: {companies: DeveloperDashboardResolver}}
        ]

    },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [CompanyauthGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent},
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full'}
];
