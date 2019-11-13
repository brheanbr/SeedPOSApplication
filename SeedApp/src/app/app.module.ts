import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { appRoutes } from './routes';
import { DeveloperLoginComponent } from './developer/developer-login/developer-login.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { DeveloperDashboardComponent } from './developer/developer-dashboard/developer-dashboard.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { HomeComponent } from './home/home.component';
import { AddCompanyComponent } from './developer/developer-dashboard/add-company/add-company.component';
import { CompanySetupComponent } from './developer/developer-dashboard/company-setup/company-setup.component';



export function tokenGetter() {
   return localStorage.getItem('token');
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
      CompanySetupComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      BrowserAnimationsModule,
      CollapseModule.forRoot(),
      BsDropdownModule.forRoot(),
      AccordionModule.forRoot(),
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
            blacklistedRoutes: ['localhost:5000/adminauth']
         }
      })
   ],
   providers: [ErrorInterceptorProvider],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
