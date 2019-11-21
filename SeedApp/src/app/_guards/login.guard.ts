import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminAuthService } from '../_services/admin-auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { DeveloperLoginComponent } from '../developer/developer-login/developer-login.component';
import { of } from 'rxjs';
import { CompanyAuthService } from '../_services/company-auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private adminAuth: AdminAuthService, private companyAuth: CompanyAuthService,
              private alertify: AlertifyService, private router: Router) {}

  canActivate(): boolean {
    if (this.adminAuth.loggedIn()) {
     this.alertify.error('Already logged in!');
     this.router.navigate(['/developer-dashboard']);
     return false;
    }
    return true;
  }
}

