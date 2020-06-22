import { POSService } from 'src/app/_services/POS.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import * as productAction from '../_actions/product.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Product } from 'src/app/_models';
import { of } from 'rxjs';




@Injectable()
export class ProductEffects {
    constructor(private actions$: Actions, private posService: POSService, private alertify: AlertifyService) {}

    @Effect()
    loadCompanyProduct$ = this.actions$
    .pipe(
        ofType<productAction.LoadProduct>(productAction.LOAD_PRODUCTS),
        mergeMap(
            (action: productAction.LoadProduct) =>
                this.posService.loadCompanyProducts(action.payload)
            .pipe(
                map((products: Product[]) =>
                    new productAction.LoadProductSuccess(products)
                ),
                catchError(error => of(new productAction.LoadProductFail(error)))
            )
        ),
    );
}