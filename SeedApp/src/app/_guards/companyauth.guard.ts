import { Injectable } from '@angular/core';
import { CanActivate, Router, CanDeactivate } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { CompanyAuthService } from '../_services/company-auth.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyauthGuard implements CanActivate {

  constructor(private companyAuth: CompanyAuthService, private alertify: AlertifyService, private router: Router) {}

  canActivate(): boolean {
    if (this.companyAuth.loggedIn()) {
      return true;
    }
    this.alertify.error('Please Sign In');
    this.router.navigate(['/company-login']);
    return false;
  }
}
