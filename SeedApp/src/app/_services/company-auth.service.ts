import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../_models/company';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AdminAuthService } from './admin-auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CompanyAuthService {
  decodedToken: any;
// decodeToken: any;
  jwtHelper = new JwtHelperService();

constructor(private http: HttpClient, private adminauth: AdminAuthService, private router: Router) { }

companyLogin(model: any) {
  return this.http.post(environment.baseUrl + 'companyauth/login', model).pipe(
    map((response: any) => {
      const company = response;
      if (company) {
        localStorage.setItem('companytoken', company.token);
        this.decodedToken = this.jwtHelper.decodeToken(company.token);
      }
    })
  );
}
loggedIn() {
    const companytoken = localStorage.getItem('companytoken');
    return !this.jwtHelper.isTokenExpired(companytoken);
}
}
