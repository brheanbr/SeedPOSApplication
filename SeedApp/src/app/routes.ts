import { Routes } from '@angular/router';
import { DashboardComponent } from './company/dashboard/dashboard.component';
import { DeveloperLoginComponent } from './developer/developer-login/developer-login.component';
import { HomeComponent } from './home/home.component';
import { CompanyLoginComponent } from './company/company-login/company-login.component';
import { LoginGuard } from './_guards/login.guard';
import { CompanyLoginGuard } from './_guards/companylogin.guard';
import { CompanyauthGuard } from './_guards/companyauth.guard';
import { CompanyResolver } from './_resolver/company.resolver';
import { CashierComponent } from './company/dashboard/cashier/cashier.component';
import { DepartmentsComponent } from './company/dashboard/departments/departments.component';
import { AdminauthGuard } from './_guards/adminauth.guard';
import { DeveloperDashboardResolver } from './_resolver/developer-dashboard.resolver';


export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'home', component: HomeComponent},
    // {
    //     path: 'company-login', component: CompanyLoginComponent,
    //     runGuardsAndResolvers: 'always',
    //     canActivate: [CompanyLoginGuard]
    // },
    { path: 'developer', loadChildren: './developer/developer.module#DeveloperModule'},
    // {
    //     path: ':unique_name', resolve: {company: CompanyResolver},
    //     runGuardsAndResolvers: 'always',
    //     canActivate: [CompanyauthGuard],
    //     children: [
    //         {path: 'cashier', component: CashierComponent},
    //         {path: 'dashboard', component: DashboardComponent},
    //         {path: 'departments', component: DepartmentsComponent}
    //     ]
    // },
    { path: '**', redirectTo: 'home'}
];
