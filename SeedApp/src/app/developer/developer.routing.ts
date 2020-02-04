import { Routes, RouterModule } from '@angular/router';
import { AdminauthGuard } from '../_guards/adminauth.guard';
import { DeveloperDashboardComponent } from './developer-dashboard/developer-dashboard.component';
import { DeveloperDashboardResolver } from '../_resolver/developer-dashboard.resolver';
import { LoginGuard } from '../_guards/login.guard';
import { DeveloperLoginComponent } from './developer-login/developer-login.component';
import { AddMenuComponent } from './add-menu/add-menu.component';

export const routes: Routes = [
    {
        path: '', runGuardsAndResolvers: 'always', canActivateChild: [AdminauthGuard],
        children: [
            {path: 'developer-dashboard', component: DeveloperDashboardComponent, resolve: {company: DeveloperDashboardResolver}},
            {path: 'add-menu', component: AddMenuComponent},
        ]
    },
    {path: 'developer-login', component: DeveloperLoginComponent, runGuardsAndResolvers: 'always', canActivate: [LoginGuard]}
];

export const DeveloperRoutes = RouterModule.forChild(routes);
