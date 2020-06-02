import { NgModule } from '@angular/core';

import { CompanyLoginComponent } from './company-login/company-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminSetupComponent } from './admin-setup/admin-setup.component';
import { CashierComponent } from './cashier/cashier.component';
import { DepartmentsComponent } from './departments/departments.component';
import { SharedModule } from '../_shared/shared.module';
import { CompanyRoutes } from './company.routing';
import { CashierLoginComponent } from './cashier-login/cashier-login.component';



@NgModule({
    declarations: [
        CompanyLoginComponent,
        DashboardComponent,
        AdminSetupComponent,
        CashierComponent,
        DepartmentsComponent,
        CashierLoginComponent
    ],
    imports: [
        SharedModule,
        CompanyRoutes
    ],
    providers: []
})

export class CompanyModule { }
