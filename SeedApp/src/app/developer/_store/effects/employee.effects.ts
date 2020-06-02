import * as employeeAction from '../actions/employee.action';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AdminService } from 'src/app/_services/Admin.service';
import { Employee } from 'src/app/_models/Employee';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class EmployeeEffects {
    constructor(private actions$: Actions, private adminService: AdminService) {}

    @Effect()
    loadCompanyEmployees$ = this.actions$
    .pipe(
        ofType<employeeAction.LoadCompanyEmployees>(employeeAction.LOAD_COMPANY_EMPLOYEES),
        mergeMap(
                (action: employeeAction.LoadCompanyEmployees) => this.adminService.getEmployees(action.payload)
                .pipe(
                    map((employee: Employee[]) =>
                        new employeeAction.LoadCompanyEmployeesSuccess(employee)
                    ),
                    catchError(error => of(new employeeAction.LoadCompanyEmployeesFail(error)))
                ),
        ),
    );

    @Effect()
    addCompanyEmployee$ = this.actions$
    .pipe(
        ofType<employeeAction.AddCompanyEmployee>(employeeAction.ADD_COMPANY_EMPLOYEE),
        map((action: employeeAction.AddCompanyEmployee) => action.payload),
        mergeMap(
            (employee: Employee) => this.adminService.addEmployees(employee)
            .pipe(
                map((newEmployee: Employee) =>
                    new employeeAction.AddCompanyEmployeeSuccess(newEmployee)
                ),
                catchError(error => of(new employeeAction.AddCompanyEmployeeFail(error)))
            )
        ),
    );

    @Effect()
    deleteEmployee$ = this.actions$
    .pipe(
        ofType<employeeAction.DeleteCompanyEmployee>(employeeAction.DELETE_COMPANY_EMPLOYEE),
        map((action: employeeAction.DeleteCompanyEmployee) => action.payload),
            mergeMap((id: number) => this.adminService.deleteEmployee(id)
                .pipe(
                    map(() => new employeeAction.DeleteCompanyEmployeeSuccess(id)),
                    catchError(error => of(new employeeAction.DeleteCompanyEmployeeFail(error)))
                )
            ),
    );


}


