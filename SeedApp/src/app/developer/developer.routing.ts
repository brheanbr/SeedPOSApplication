import { Routes, RouterModule } from '@angular/router';
import { AdminauthGuard } from '../_guards/adminauth.guard';
import { DeveloperDashboardComponent } from './developer-dashboard/developer-dashboard.component';
import { DeveloperDashboardResolver } from '../_resolver/developer-dashboard.resolver';
import { DeveloperLoginComponent } from './developer-login/developer-login.component';
import { CompanyDetailsComponent } from './developer-dashboard/company-setup/company-details/company-details.component';
import { AdminLoginGuard } from '../_guards/adminlogin.guard';

export const routes: Routes = [
    {
        path: '', runGuardsAndResolvers: 'always', canActivateChild: [AdminauthGuard],
        children: [
            {path: 'developer-dashboard', component: DeveloperDashboardComponent},
            {path: 'company/:companyId', component: CompanyDetailsComponent},
        ]
    },
    {path: 'developer-login', component: DeveloperLoginComponent, runGuardsAndResolvers: 'always', canActivate: [AdminLoginGuard]}
];

export const DeveloperRoutes = RouterModule.forChild(routes);
