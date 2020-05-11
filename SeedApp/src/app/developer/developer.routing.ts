import { Routes, RouterModule } from '@angular/router';
import { AdminauthGuard } from '../_guards/adminauth.guard';
import { DeveloperDashboardComponent } from './developer-dashboard/developer-dashboard.component';
import { DeveloperDashboardResolver } from '../_resolver/developer-dashboard.resolver';
import { LoginGuard } from '../_guards/login.guard';
import { DeveloperLoginComponent } from './developer-login/developer-login.component';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { CompanyDetailsComponent } from './developer-dashboard/company-setup/company-details/company-details.component';
import { CompanyDetailsResolver } from './_resolver/company-details.resolver';
import { resolve } from 'url';
import { CompanyResolver } from '../_resolver/company.resolver';
import { AdminCompanyGuard } from '../_guards/admin-company.guard';

export const routes: Routes = [
    {
        path: '', runGuardsAndResolvers: 'always', canActivateChild: [AdminauthGuard],
        children: [
            {path: 'developer-dashboard', component: DeveloperDashboardComponent},
            {path: 'add-menu', component: AddMenuComponent},
            {path: 'company/:companyId', component: CompanyDetailsComponent},
        ]
    },
    {path: 'developer-login', component: DeveloperLoginComponent, runGuardsAndResolvers: 'always', canActivate: [LoginGuard]}
];

export const DeveloperRoutes = RouterModule.forChild(routes);
