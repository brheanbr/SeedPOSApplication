import { Action } from '@ngrx/store';
import { Order } from 'src/app/_models';


export const ADD_ORDER = '[Order] Add Order';
export const ADD_ORDER_FAIL = '[Order] Add Order Fail';
export const ADD_ORDER_SUCCESS = '[Order] Add Order Success';

export const LOAD_ORDERS = '[Order] Load Orders';
export const LOAD_ORDERS_FAIL = '[Order] Load Orders Fail';
export const LOAD_ORDERS_SUCCESS = '[Order] Load Orders Success';

export class AddOrder implements Action {
    readonly type = ADD_ORDER;
    constructor(public payload: Order) {}
}

export class AddOrderFail implements Action {
    readonly type = ADD_ORDER_FAIL;
    constructor(public payload: string) {}
}
export class AddOrderSuccess implements Action {
    readonly type = ADD_ORDER_SUCCESS;
    constructor(public payload: Order) {}
}

export class LoadOrders implements Action {
    readonly type = LOAD_ORDERS;
    constructor(public payload: string) {}
}
export class LoadOrdersFail implements Action {
    readonly type = LOAD_ORDERS_FAIL;
    constructor(public payload: string) {}
}
export class LoadOrdersSuccess implements Action {
    readonly type = LOAD_ORDERS_SUCCESS;
    constructor(public payload: Order[]) {}
}

export type OrderActions =
| AddOrder
| AddOrderFail
| AddOrderSuccess
| LoadOrders
| LoadOrdersFail
| LoadOrdersSuccess;
