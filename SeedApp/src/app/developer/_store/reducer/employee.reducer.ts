import * as fromEmployee from '../actions/employee.action';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Employee } from 'src/app/_models/Employee';


export interface EmployeeState extends EntityState<Employee> {
    loaded: boolean;
    loading: boolean;
    error: string;
}

export const employeeAdapter: EntityAdapter<Employee> = createEntityAdapter <Employee>({
    selectId: employee => employee.EmployeeId
});

export const defaultEmployee: EmployeeState = {
    ids: [],
    entities: {},
    loaded: false,
    loading: false,
    error: undefined,
};

export const initialstate = employeeAdapter.getInitialState(defaultEmployee);

export function employeeReducer(state = initialstate, action: fromEmployee.employeeAction): EmployeeState {
    switch (action.type) {
        case fromEmployee.LOAD_COMPANY_EMPLOYEES_SUCCESS: {
            return employeeAdapter.addAll(action.payload, {
                ...state,
                loading: false,
                loaded: true,
                error: undefined
            });
        }
        case fromEmployee.LOAD_COMPANY_EMPLOYEES_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload
            };
        }
        case fromEmployee.ADD_COMPANY_EMPLOYEE_SUCCESS: {
            return employeeAdapter.addOne(action.payload, {
                ...state,
                loading: false,
                loaded: true,
                error: undefined
            });
        }
        case fromEmployee.ADD_COMPANY_EMPLOYEE_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload
            };
        }

        case fromEmployee.DELETE_COMPANY_EMPLOYEE_SUCCESS: {
            return employeeAdapter.removeOne(action.payload, state);
        }
        case fromEmployee.DELETE_COMPANY_EMPLOYEE_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload
            };
        }

        default:
        return state;
    }
}