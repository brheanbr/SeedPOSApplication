import { Injectable } from '@angular/core';
import { Company } from '../_models/company';
import { Resolve,  ActivatedRouteSnapshot, Router } from '@angular/router';
import { CompanyAuthService } from '../_services/company-auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { POSService } from '../_services/POS.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CompanyResolver implements Resolve<Company> {
    constructor(private pos: POSService, private alertify: AlertifyService, private companyAuth: CompanyAuthService,
                private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Company> {
        if (route.params.unique_name === this.companyAuth.decodedToken.unique_name) {
            return this.pos.getCompany(route.params.unique_name, this.companyAuth.decodedToken.nameid).pipe(
                catchError(error => {
                    this.alertify.error(error);
                    this.router.navigate(['/home']);
                    return of(null);
                })
            );
        }
        this.alertify.error('Page Not Found');
        this.router.navigate(['/home']);
        return of(null);
    }
}
