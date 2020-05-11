import { Injectable } from '@angular/core';
import { Company } from 'src/app/_models/company';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../_store';
import * as fromRoot from '../../_store';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, take, mergeMap } from 'rxjs/operators';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Injectable()
export class CompanyDetailsResolver implements Resolve<Company> {
    constructor(private store: Store<fromStore.CompanyAction>, private alertify: AlertifyService, private router: Router) {}

    resolve(): Observable<Company> {
        return this.store.select(fromStore.getCompany).pipe(take(1));
    }
}
