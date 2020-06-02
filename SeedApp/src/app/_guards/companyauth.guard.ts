import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild, ActivatedRouteSnapshot } from '@angular/router';
import { AdminAuthService } from '../_services/admin-auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { CompanyAuthService } from '../_services/company-auth.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyAuthGuard implements CanActivateChild {

  constructor(private companyAuth: CompanyAuthService,
              private alertify: AlertifyService, private router: Router) {}

  canActivateChild(route: ActivatedRouteSnapshot): boolean {
    if (this.companyAuth.loggedIn()) {
        if (this.companyAuth.decodedToken.unique_name !== route.params.unique_name)
        {
            this.router.navigate(['company/' + this.companyAuth.decodedToken.unique_name + '/dashboard']);
            return true;
        }
        return true;
    }
    this.alertify.message('Please Sign In');
    this.router.navigate(['company/login']);
    return true;
    }
}
