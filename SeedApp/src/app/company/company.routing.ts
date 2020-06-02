import { Routes, RouterModule } from '@angular/router';
import { CompanyLoginComponent } from './company-login/company-login.component';
import { CompanyLoginGuard } from '../_guards/companylogin.guard';
import { CashierComponent } from './cashier/cashier.component';
import { CompanyResolver } from '../_resolver/company.resolver';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompanyAuthGuard } from '../_guards/companyauth.guard';

export const routes: Routes = [
      {path: 'login', component: CompanyLoginComponent, runGuardsAndResolvers : 'always', canActivate: [CompanyLoginGuard]},
      {
        path: ':unique_name', runGuardsAndResolvers: 'always', canActivateChild: [CompanyAuthGuard],
        children: [
          {path: 'cashier', component: CashierComponent},
          {path: 'dashboard', component: DashboardComponent},
          { path: '**', redirectTo: 'dashboard'}
        ]
      }
];

export const CompanyRoutes = RouterModule.forChild(routes);
