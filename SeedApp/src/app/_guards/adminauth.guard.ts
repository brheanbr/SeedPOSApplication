import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminAuthService } from '../_services/admin-auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { DeveloperLoginComponent } from '../developer/developer-login/developer-login.component';

@Injectable({
  providedIn: 'root'
})
export class AdminauthGuard implements CanActivate {

  constructor(private adminAuth: AdminAuthService, private alertify: AlertifyService, private router: Router) {}

  canActivate(): boolean {
    if (this.adminAuth.loggedIn()) {
      return true;
    }
    this.alertify.error('Please Sign In');
    this.router.navigate(['/developer-login']);
    return false;
  }
}
