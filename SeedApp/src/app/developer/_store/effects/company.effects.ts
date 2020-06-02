import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import * as companyActions from '../actions/company.action';

import { AdminService } from 'src/app/_services/Admin.service';

import { mergeMap, map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Company } from 'src/app/_models/company';
import { Action } from '@ngrx/store';
import { Product } from 'src/app/_models';

@Injectable()
export class CompanyEffects {
    constructor(private actions$: Actions, private adminService: AdminService) {}

    @Effect()
    loadCompanies$: Observable<Action> = this.actions$
    .pipe(
        ofType<companyActions.LoadCompanies>(companyActions.LOAD_COMPANIES),
        mergeMap(
            () => this.adminService.getCompanies()
            .pipe(
                map( (company: Company[]) =>
                     new companyActions.LoadCompaniesSuccess(company)
                ),
                catchError(error => of(new companyActions.LoadCompaniesFail(error)))
            )
        ),
    );

    @Effect()
    loadCompany$: Observable<Action> = this.actions$
    .pipe(
        ofType<companyActions.LoadCompany>(companyActions.LOAD_COMPANY),
        mergeMap(
            (action: companyActions.LoadCompany) => this.adminService.getCompany(action.payload)
            .pipe(
                map( (company: Company) =>
                     new companyActions.LoadCompanySuccess(company)
                ),
                catchError(error => of(new companyActions.LoadCompanyFail(error)))
            )
        ),
    );

    @Effect()
    addCompany$ = this.actions$
    .pipe(
        ofType<companyActions.AddCompany>(companyActions.ADD_COMPANY),
        map((action: companyActions.AddCompany) => action.payload),
        mergeMap(
            (company: Company) => this.adminService.companyRegister(company)
            .pipe(
                map((newCompany: Company) =>
                     new companyActions.AddCompanySuccess(newCompany)
                ),
                catchError(error => of(new companyActions.AddCompanyFail(error)))
            )
        ),
    );

    @Effect()
    deleteCompany$ = this.actions$
    .pipe(
        ofType<companyActions.DeleteCompany>(companyActions.DELETE_COMPANY),
        map((action: companyActions.DeleteCompany) => action.payload),
        mergeMap((id: number) => this.adminService.deleteCompany(id)
            .pipe(
                map(() => new companyActions.DeleteCompanySuccess(id)),
                catchError(error => of(new companyActions.DeleteCompanyFail(error)))
            )
        )
    );
}
