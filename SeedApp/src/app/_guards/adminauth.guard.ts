import { Injectable } from '@angular/core';
import {  Router, CanActivateChild, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminAuthService } from '../_services/admin-auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { DeveloperLoginComponent } from '../developer/developer-login/developer-login.component';

@Injectable({
  providedIn: 'root'
})
export class AdminauthGuard implements CanActivateChild {

  constructor(private adminAuth: AdminAuthService, private alertify: AlertifyService, private router: Router) {}

  canActivateChild(): boolean {
    if (this.adminAuth.loggedIn()) {
      return true;
    }
    this.alertify.message('Please Sign In');
    this.router.navigate(['developer/developer-login']);
    return true;
  }
}
