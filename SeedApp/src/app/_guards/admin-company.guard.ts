import { Injectable } from '@angular/core';
import { CanActivateChild, Router, CanActivate } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';


@Injectable({
    providedIn: 'root'
})

export class AdminCompanyGuard implements CanActivate {
    constructor(private alertify: AlertifyService,  private router: Router) {}

    canActivate(): boolean {
        if (localStorage.getItem('companyid')) {
            return true;
        }

        this.alertify.error('Please select Company!');
        this.router.navigate(['developer/developer-dashboard']);
        return false;
    }
}
