import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './company/dashboard/dashboard.component';
import { appRoutes } from './routes';
import { DeveloperLoginComponent } from './developer/developer-login/developer-login.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DeveloperDashboardComponent } from './developer/developer-dashboard/developer-dashboard.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { HomeComponent } from './home/home.component';
import { AddCompanyComponent } from './developer/developer-dashboard/add-company/add-company.component';
import { CompanySetupComponent } from './developer/developer-dashboard/company-setup/company-setup.component';
import { AdminAuthService } from './_services/admin-auth.service';
import { CompanyAuthService } from './_services/company-auth.service';
import { DeveloperDashboardResolver } from './_resolver/developer-dashboard.resolver';
import { CompanyLoginComponent } from './company/company-login/company-login.component';
import { CompanyResolver } from './_resolver/company.resolver';
import { CashierComponent } from './company/dashboard/cashier/cashier.component';
import { DepartmentsComponent } from './company/dashboard/departments/departments.component';
import { AdminSetupComponent } from './company/dashboard/admin-setup/admin-setup.component';
import { CompanyCardComponent } from './developer/developer-dashboard/company-setup/company-card/company-card.component';



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
      AppComponent,
      NavbarComponent,
      DashboardComponent,
      DeveloperLoginComponent,
      DeveloperDashboardComponent,
      HomeComponent,
      AddCompanyComponent,
      CompanySetupComponent,
      CompanyLoginComponent,
      CashierComponent,
      DepartmentsComponent,
      AdminSetupComponent,
      CompanyCardComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      CollapseModule.forRoot(),
      BsDropdownModule.forRoot(),
      AccordionModule.forRoot(),
      ModalModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      CollapseModule.forRoot(),
      MatDividerModule,
      MatListModule,
      BrowserAnimationsModule,
      HttpClientModule,
      JwtModule.forRoot({
         config: {
            tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/adminauth', 'localhost:5000/companyauth']
         }
      })
   ],
   providers: [
      ErrorInterceptorProvider,
      AdminAuthService,
      CompanyAuthService,
      DeveloperDashboardResolver,
      CompanyResolver
      ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
