import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminAuthService } from '../_services/admin-auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { CompanyAuthService } from '../_services/company-auth.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyLoginGuard implements CanActivate {

  constructor(private companyAuth: CompanyAuthService,
              private alertify: AlertifyService, private router: Router) {}

  canActivate(): boolean {
    if (this.companyAuth.loggedIn()) {
      this.alertify.error('Already logged in!');
      this.router.navigate(['company/' + this.companyAuth.decodedToken.unique_name + '/dashboard']);
      return true;
    }
    return true;
  }
}

