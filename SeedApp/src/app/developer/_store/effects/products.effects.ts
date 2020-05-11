import { Injectable } from '@angular/core';
import { AdminService } from 'src/app/_services/Admin.service';
import { Actions, Effect, ofType, act } from '@ngrx/effects';
import * as productAction from '../actions/index';
import { Product } from 'src/app/_models';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AlertifyService } from 'src/app/_services/alertify.service';



@Injectable()
export class ProductEffects {
    constructor(private actions$: Actions, private adminService: AdminService, private alertify: AlertifyService) {}

    @Effect()
    loadCompanyProduct$ = this.actions$
    .pipe(
        ofType<productAction.LoadCompanyProduct>(productAction.LOAD_COMPANY_PRODUCTS),
        mergeMap(
            (action: productAction.LoadCompanyProduct) =>
                this.adminService.loadCompanyProducts(action.payload)
            .pipe(
                map((products: Product[]) =>
                    new productAction.LoadCompanyProductSuccess(products)
                ),
                catchError(error => of(new productAction.LoadCompanyProductFail(error)))
            )
        ),
    );
    @Effect()
    addCompanyProduct$ = this.actions$
    .pipe(
        ofType<productAction.AddCompanyProduct>(productAction.ADD_COMPANY_PRODUCT),
        map((action: productAction.AddCompanyProduct) => action.payload),
        mergeMap(
            (product: Product) => this.adminService.addCompanyProduct(product)
            .pipe(
                map((newProduct: Product) =>
                    new productAction.AddCompanyProductSuccess(newProduct)
                ),
                catchError( error => of(new productAction.AddCompanyProductFail(error)))
            )
        ),
    );

    @Effect()
    editCompanyProduct$ = this.actions$
    .pipe(
        ofType<productAction.EditCompanyProduct>(productAction.EDIT_COMPANY_PRODUCT),
        mergeMap((action: productAction.EditCompanyProduct) => this.adminService.editProduct(action.payload)
               .pipe(
                map((updatedProduct: Product) => new productAction.EditCompanyProductSuccess({
                    id: updatedProduct.Id,
                    changes: updatedProduct
                })),
            catchError( error => of(new productAction.EditCompanyProductFail(error)))
           )
    ));

    @Effect()
    deleteCompanyProduct$ = this.actions$
    .pipe(
        ofType<productAction.DeleteCompanyProduct>(productAction.DELETE_COMPANY_PRODUCT),
        map((action: productAction.DeleteCompanyProduct) => action.payload),
        mergeMap((id: number) => this.adminService.deleteProduct(id)
        .pipe(
            map(() => new productAction.DeleteCompanyProductSuccess(id)),
            catchError(error => of(new productAction.DeleteCompanyFail(error)))
        )),
    );
}
