import { Action } from '@ngrx/store';
import { Product } from 'src/app/_models';
import { Update } from '@ngrx/entity';

export const LOAD_PRODUCTS = '[Product] Load Products';
export const LOAD_PRODUCTS_FAIL = '[Product] Load Products Fail';
export const LOAD_PRODUCTS_SUCCESS = '[Product] Load Products Success';


export class LoadProduct implements Action {
    readonly type = LOAD_PRODUCTS;

    constructor(public payload: string) {}
}

export class LoadProductFail implements Action {
    readonly type = LOAD_PRODUCTS_FAIL;

    constructor(public payload: any) {}
}

export class LoadProductSuccess implements Action {
    readonly type = LOAD_PRODUCTS_SUCCESS;

    constructor(public payload: Product[]) {}
}

export type ProductAction =
| LoadProduct
| LoadProductFail
| LoadProductSuccess;
