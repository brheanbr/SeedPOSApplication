import { Action } from '@ngrx/store';
import { Company } from 'src/app/_models/company';

export enum DeveloperActionTypes {
    Load_Company = '[COMPANY] Load Company',
    Load_Company_Success = '[COMPANY] Load Company Success',
    Load_Company_Failure = '[COMPANY] Load Company Failure',
}

export class LoadCompanyAction implements Action {
    readonly type = DeveloperActionTypes.Load_Company;
}

export class LoadCompanySuccessAction implements Action {
    readonly type = DeveloperActionTypes.Load_Company_Success;

    constructor(public payload: Company[]) {}
}

export class LoadCompanyFailureAction implements Action {
    readonly type = DeveloperActionTypes.Load_Company_Failure;

    constructor(public payload: Error) {}
}

export type DeveloperAction =
| LoadCompanyAction
| LoadCompanyFailureAction
| LoadCompanySuccessAction;
