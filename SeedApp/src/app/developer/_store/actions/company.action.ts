import { Action } from '@ngrx/store';
import { Company, Product } from 'src/app/_models';

export const LOAD_COMPANIES = '[Company] Load Companies';
export const LOAD_COMPANIES_FAIL = '[Company] Load Companies Fail';
export const LOAD_COMPANIES_SUCCESS = '[Company] Load Companies Success';

export const LOAD_COMPANY = '[Company] Load Company';
export const LOAD_COMPANY_FAIL = '[Company] Load Company Fail';
export const LOAD_COMPANY_SUCCESS = '[Company] Load Company Success';

export const ADD_COMPANY = '[Company] Add Company';
export const ADD_COMPANY_FAIL = '[Company] Add Company Fail';
export const ADD_COMPANY_SUCCESS = '[Company] Add Company Success';

export const DELETE_COMPANY = '[Company] Delete Company';
export const DELETE_COMPANY_FAIL = '[Company] Delete Company Fail';
export const DELETE_COMPANY_SUCCESS = '[Company] Delete Company Success';

// Company
export class LoadCompanies implements Action {
    readonly type = LOAD_COMPANIES;
}

export class LoadCompaniesSuccess implements Action {
    readonly type = LOAD_COMPANIES_SUCCESS;

    constructor(public payload: Company[]) {}
}

export class LoadCompaniesFail implements Action {
    readonly type = LOAD_COMPANIES_FAIL;

    constructor(public payload: any) {}
}

export class LoadCompany implements Action {
    readonly type = LOAD_COMPANY;
    constructor(public payload: string) {}
}

export class LoadCompanySuccess implements Action {
    readonly type = LOAD_COMPANY_SUCCESS;

    constructor(public payload: Company) {}
}

export class LoadCompanyFail implements Action {
    readonly type = LOAD_COMPANY_FAIL;

    constructor(public payload: any) {}
}

export class AddCompany implements Action {
    readonly type = ADD_COMPANY;

    constructor(public payload: Company) {}
}

export class AddCompanySuccess implements Action {
    readonly type = ADD_COMPANY_SUCCESS;

    constructor(public payload: Company) {}
}

export class AddCompanyFail implements Action {
    readonly type = ADD_COMPANY_FAIL;

    constructor(public payload: any) {}
}

export class DeleteCompany implements Action {
    readonly type = DELETE_COMPANY;

    constructor(public payload: number) {}
}

export class DeleteCompanySuccess implements Action {
    readonly type = DELETE_COMPANY_SUCCESS;

    constructor(public payload: number) {}
}

export class DeleteCompanyFail implements Action {
    readonly type = DELETE_COMPANY_FAIL;

    constructor(public payload: any) {}
}


export type CompanyAction =
| LoadCompanies
| LoadCompaniesFail
| LoadCompaniesSuccess
| LoadCompany
| LoadCompanyFail
| LoadCompanySuccess
| AddCompany
| AddCompanyFail
| AddCompanySuccess
| DeleteCompany
| DeleteCompanyFail
| DeleteCompanySuccess;
