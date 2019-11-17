import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Company } from '../_models/company';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
decodedToken: any;
jwtHelper = new JwtHelperService();
companies: Company[];

constructor(private http: HttpClient) { }

  adminLogin(model: Company) {
    return this.http.post(environment.baseUrl + 'adminauth/login', model).pipe(
      map((response: any) => {
        const admin = response;
        if (admin) {
          localStorage.setItem('token', admin.token);
          this.decodedToken = this.jwtHelper.decodeToken(admin.token);
        }
      })
    );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  companyRegister(company: Company) {
    return this.http.post(environment.baseUrl + 'adminauth/register-company', company);
  }

  getCompanies() {
    return this.http.get(environment.baseUrl + 'adminauth/companies');
  }

}
