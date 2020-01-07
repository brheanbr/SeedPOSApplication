import { Injectable } from '@angular/core';
import { Company } from '../_models/company';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AdminAuthService } from '../_services/admin-auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AdminService } from '../_services/Admin.service';

@Injectable()
export class DeveloperDashboardResolver implements Resolve<Company[]> {
    constructor(private admin: AdminService, private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Company[]> {
        return this.admin.getCompanies().pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data!');
                return of(null);
            })
        );
    }
}
