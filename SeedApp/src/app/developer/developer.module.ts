import { NgModule } from '@angular/core';

import { DeveloperDashboardComponent } from './developer-dashboard/developer-dashboard.component';
import { AddCompanyComponent } from './developer-dashboard/add-company/add-company.component';
import { CompanySetupComponent } from './developer-dashboard/company-setup/company-setup.component';
import { CompanyCardComponent } from './developer-dashboard/company-setup/company-card/company-card.component';
import { CompanyEmployeeComponent } from './developer-dashboard/company-setup/company-employee/company-employee.component';
import { DeveloperLoginComponent } from './developer-login/developer-login.component';

import { SharedModule } from '../_shared/shared.module';

import { AlertModule } from 'ngx-bootstrap/alert';

import { DeveloperDashboardResolver } from '../_resolver/developer-dashboard.resolver';
import { DeveloperRoutes } from './developer.routing';
import { StoreModule } from '@ngrx/store';
import { effects, reducers  } from './_store';
import { EffectsModule } from '@ngrx/effects';
import { ErrorInterceptorProvider } from '../_services/error.interceptor';
import { CompanyDetailsComponent } from './developer-dashboard/company-setup/company-details/company-details.component';
import { CompanyDetailsResolver } from './_resolver/company-details.resolver';
import { FilterPipe } from '../_shared/_pipes/filter.pipe';
import { FilterEmployeePipe } from '../_shared/_pipes/filterEmployee.pipe';

export function tokenGetter() {
  const token = localStorage.getItem('token');
  const companytoken = localStorage.getItem('companytoken');
  if (token) {
     return localStorage.getItem('token');
  }
  if (companytoken) {
     return localStorage.getItem('companytoken');
  }
}

@NgModule({
  declarations: [
    DeveloperDashboardComponent,
    AddCompanyComponent,
    CompanySetupComponent,
    CompanyCardComponent,
    CompanyEmployeeComponent,
    DeveloperLoginComponent,
    CompanyDetailsComponent,
    FilterPipe,
    FilterEmployeePipe,
  ],
  imports: [
    SharedModule,
    AlertModule.forRoot(),
    DeveloperRoutes,
    StoreModule.forFeature('companies', reducers),
    EffectsModule.forFeature(effects),
  ],
  providers: [
    ErrorInterceptorProvider,
    CompanyDetailsResolver
  ]
})
export class DeveloperModule { }
