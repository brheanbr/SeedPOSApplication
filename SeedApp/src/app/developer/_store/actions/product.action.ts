import { Action } from '@ngrx/store';
import { Product } from 'src/app/_models';
import { Observable } from 'rxjs';
import { Update } from '@ngrx/entity';

export const LOAD_COMPANY_PRODUCTS = '[Product] Load Company Products';
export const LOAD_COMPANY_PRODUCTS_FAIL = '[Product] Load Company Products Fail';
export const LOAD_COMPANY_PRODUCTS_SUCCESS = '[Product] Load Company Products Success';

export const ADD_COMPANY_PRODUCT = '[Product] Add Company Product';
export const ADD_COMPANY_PRODUCT_FAIL = '[Product] Add Company Product Fail';
export const ADD_COMPANY_PRODUCT_SUCCESS = '[Product] Add Company Product Success';

export const EDIT_COMPANY_PRODUCT = '[Product] Edit Company Product';
export const EDIT_COMPANY_PRODUCT_FAIL = '[Product] Edit Company Product Fail';
export const EDIT_COMPANY_PRODUCT_SUCCESS = '[Product] Edit Company Product Success';

export const DELETE_COMPANY_PRODUCT = '[Product] Delete Company Product';
export const DELETE_COMPANY_PRODUCT_FAIL = '[Product] Delete Company Product Fail';
export const DELETE_COMPANY_PRODUCT_SUCCESS = '[Product] Delete Company Product Success';


export class LoadCompanyProduct implements Action {
    readonly type = LOAD_COMPANY_PRODUCTS;

    constructor(public payload: string) {}
}

export class LoadCompanyProductFail implements Action {
    readonly type = LOAD_COMPANY_PRODUCTS_FAIL;

    constructor(public payload: any) {}
}

export class LoadCompanyProductSuccess implements Action {
    readonly type = LOAD_COMPANY_PRODUCTS_SUCCESS;

    constructor(public payload: Product[]) {}
}

export class AddCompanyProduct implements Action {
    readonly type = ADD_COMPANY_PRODUCT;

    constructor(public payload: Product) {}
}

export class AddCompanyProductFail implements Action {
    readonly type = ADD_COMPANY_PRODUCT_FAIL;

    constructor(public payload: string) {}
}

export class AddCompanyProductSuccess implements Action {
    readonly type = ADD_COMPANY_PRODUCT_SUCCESS;

    constructor(public payload: Product) {}
}

export class EditCompanyProduct implements Action {
    readonly type = EDIT_COMPANY_PRODUCT;

    constructor(public payload: Product) {}
}

export class EditCompanyProductFail implements Action {
    readonly type = EDIT_COMPANY_PRODUCT_FAIL;

    constructor(public payload: string) {}
}

export class EditCompanyProductSuccess implements Action {
    readonly type = EDIT_COMPANY_PRODUCT_SUCCESS;

    constructor(public payload: Update<Product>) {}
}

export class DeleteCompanyProduct implements Action {
    readonly type = DELETE_COMPANY_PRODUCT;

    constructor(public payload: number) {}
}

export class DeleteCompanyProductFail implements Action {
    readonly type = DELETE_COMPANY_PRODUCT_FAIL;

    constructor(public payload: string) {}
}

export class DeleteCompanyProductSuccess implements Action {
    readonly type = DELETE_COMPANY_PRODUCT_SUCCESS;

    constructor(public payload: number) {}
}


export type ProductAction =
| AddCompanyProduct
| AddCompanyProductFail
| AddCompanyProductSuccess
| LoadCompanyProduct
| LoadCompanyProductFail
| LoadCompanyProductSuccess
| EditCompanyProduct
| EditCompanyProductFail
| EditCompanyProductSuccess
| DeleteCompanyProduct
| DeleteCompanyProductFail
| DeleteCompanyProductSuccess;
