import { Action } from '@ngrx/store';
import { Employee } from 'src/app/_models/Employee';


export const LOAD_COMPANY_EMPLOYEES = '[Employee] Load Company Employees';
export const LOAD_COMPANY_EMPLOYEES_SUCCESS = '[Employee] Load Company Employees Success';
export const LOAD_COMPANY_EMPLOYEES_FAIL = '[Employee] Load Company Employees Fail';

export const ADD_COMPANY_EMPLOYEE  = '[Employee] Add Company Employees';
export const ADD_COMPANY_EMPLOYEE_SUCCESS = '[Employee] Add Company Employees Success';
export const ADD_COMPANY_EMPLOYEE_FAIL = '[Employee] Add Company Employees Fail';

export const DELETE_COMPANY_EMPLOYEE  = '[Employee] Delete Company Employees';
export const DELETE_COMPANY_EMPLOYEE_SUCCESS = '[Employee] Delete Company Employees Success';
export const DELETE_COMPANY_EMPLOYEE_FAIL = '[Employee] Delete Company Employees Fail';

export class LoadCompanyEmployees implements Action {
    readonly type = LOAD_COMPANY_EMPLOYEES;

    constructor(public payload: string) {}
}

export class LoadCompanyEmployeesSuccess implements Action {
    readonly type = LOAD_COMPANY_EMPLOYEES_SUCCESS;

    constructor(public payload: Employee[]) {}
}

export class LoadCompanyEmployeesFail implements Action {
    readonly type = LOAD_COMPANY_EMPLOYEES_FAIL;

    constructor(public payload: string) {}
}

export class AddCompanyEmployee implements Action {
    readonly type = ADD_COMPANY_EMPLOYEE;

    constructor(public payload: Employee) {}
}

export class AddCompanyEmployeeSuccess implements Action {
    readonly type = ADD_COMPANY_EMPLOYEE_SUCCESS;

    constructor(public payload: Employee) {}
}

export class AddCompanyEmployeeFail implements Action {
    readonly type = ADD_COMPANY_EMPLOYEE_FAIL;

    constructor(public payload: string) {}
}

export class DeleteCompanyEmployee implements Action {
    readonly type = DELETE_COMPANY_EMPLOYEE;

    constructor(public payload: number) {}
}

export class DeleteCompanyEmployeeSuccess implements Action {
    readonly type = DELETE_COMPANY_EMPLOYEE_SUCCESS;

    constructor(public payload: number) {}
}

export class DeleteCompanyEmployeeFail implements Action {
    readonly type = DELETE_COMPANY_EMPLOYEE_FAIL;

    constructor(public payload: string) {}
}

export type employeeAction =
| LoadCompanyEmployees
| LoadCompanyEmployeesSuccess
| LoadCompanyEmployeesFail
| AddCompanyEmployee
| AddCompanyEmployeeFail
| AddCompanyEmployeeSuccess
| DeleteCompanyEmployee
| DeleteCompanyEmployeeFail
| DeleteCompanyEmployeeSuccess;
