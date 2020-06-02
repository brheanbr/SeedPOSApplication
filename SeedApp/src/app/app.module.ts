import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';

import { reducers, CustomSerializer } from './_store';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

import { appRoutes } from './routes';


import { ErrorInterceptorProvider } from './_services/error.interceptor';

import { SharedModule } from './_shared/shared.module';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environments/environment';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';





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
      HomeComponent
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
      StoreModule.forRoot(reducers, { metaReducers }),
      StoreRouterConnectingModule.forRoot({serializer: CustomSerializer}),
      EffectsModule.forRoot([]),
      StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
   ],
   providers: [
      ErrorInterceptorProvider,
      ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
