import { NgModule } from '@angular/core';

import { OrderPrintingTemplateComponent } from './order-printing-template/order-printing-template.component';
import { OrderSlipComponent } from './order-slip/order-slip.component';
import { CompanyLoginComponent } from './company-login/company-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminSetupComponent } from './admin-setup/admin-setup.component';
import { CashierComponent } from './cashier/cashier.component';
import { DepartmentsComponent } from './departments/departments.component';
import { SharedModule } from '../_shared/shared.module';
import { CompanyRoutes } from './company.routing';
import { CashierLoginComponent } from './cashier-login/cashier-login.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { posEffects } from './_store';
import { ProductCardComponent } from './product-card/product-card.component';
import { FilterPosProductsPipe } from '../_shared/_pipes/filterPosProducts.pipe';



import { CarouselModule } from 'ngx-bootstrap/carousel';
import { reducers } from './_store/_reducers';




@NgModule({
    declarations: [
        CompanyLoginComponent,
        DashboardComponent,
        AdminSetupComponent,
        CashierComponent,
        DepartmentsComponent,
        CashierLoginComponent,
        ProductCardComponent,
        OrderSlipComponent,
        OrderPrintingTemplateComponent,
        FilterPosProductsPipe
    ],
    imports: [
        SharedModule,
        CompanyRoutes,
        StoreModule.forFeature('pos', reducers),
        EffectsModule.forFeature(posEffects),
        CarouselModule.forRoot()
    ],
    providers: []
})

export class CompanyModule { }
