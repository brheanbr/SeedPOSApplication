import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

import { appRoutes } from './routes';


import { ErrorInterceptorProvider } from './_services/error.interceptor';

import { DashboardComponent } from './company/dashboard/dashboard.component';
import { CompanyLoginComponent } from './company/company-login/company-login.component';
import { CompanyResolver } from './_resolver/company.resolver';
import { CashierComponent } from './company/dashboard/cashier/cashier.component';
import { DepartmentsComponent } from './company/dashboard/departments/departments.component';
import { AdminSetupComponent } from './company/dashboard/admin-setup/admin-setup.component';

import { SharedModule } from './_shared/shared.module';
import { DeveloperDashboardResolver } from './_resolver/developer-dashboard.resolver';
import { StoreModule, MetaReducer } from '@ngrx/store';




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

export const metaReducers: MetaReducer<any>[] = [];
@NgModule({
   declarations: [
      AppComponent,
      NavbarComponent,
      DashboardComponent,
      HomeComponent,
      CompanyLoginComponent,
      CashierComponent,
      DepartmentsComponent,
      AdminSetupComponent

   ],
   imports: [
      SharedModule,
      BrowserModule,
      BrowserAnimationsModule,
      RouterModule.forRoot(appRoutes),
      BrowserAnimationsModule,
      HttpClientModule,
      JwtModule.forRoot({
         config: {
            tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/adminauth', 'localhost:5000/companyauth']
         }
      }),
      StoreModule.forRoot({}, { metaReducers }),
   ],
   providers: [
      ErrorInterceptorProvider,
      CompanyResolver
      ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
