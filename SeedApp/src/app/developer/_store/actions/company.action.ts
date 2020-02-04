import { Action } from '@ngrx/store';
import { Company } from 'src/app/_models/company';

export const LOAD_COMPANY = '[Company] Load Company';
export const LOAD_COMPANY_FAIL = '[Company] Load Company Fail';
export const LOAD_COMPANY_SUCCESS = '[Company] Load Company Success';

export class LoadCompany implements Action {
    readonly type = LOAD_COMPANY;
}

export class LoadCompanySuccess implements Action {
    readonly type = LOAD_COMPANY_FAIL;

    constructor(public payload: Company[]) {}
}

export class LoadCompanyFail implements Action {
    readonly type = LOAD_COMPANY_SUCCESS;

    constructor(public payload: any) {}
}

export type CompanyAction = LoadCompany | LoadCompanyFail | LoadCompanySuccess;
