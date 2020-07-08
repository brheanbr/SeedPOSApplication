import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { POSService } from 'src/app/_services/POS.service';
import * as orderAction from '../_actions/order.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Order } from 'src/app/_models';
import { of } from 'rxjs';



@Injectable()
export class OrderEffects {
    constructor(private actions$: Actions, private posService: POSService) {}

    @Effect()
    addOrder$ = this.actions$
    .pipe(
        ofType<orderAction.AddOrder>(orderAction.ADD_ORDER),
        mergeMap(
            (action: orderAction.AddOrder) => this.posService.makeOrder(action.payload)
            .pipe(
                map((order: Order) => new orderAction.AddOrderSuccess(order)),
                catchError(err => of(new orderAction.AddOrderFail(err)))
            )
        ),
    );

    @Effect()
    loadOrders$ = this.actions$
    .pipe(
        ofType<orderAction.LoadOrders>(orderAction.LOAD_ORDERS),
        mergeMap(
            (action: orderAction.LoadOrders) => this.posService.loadUnpaidOrders(action.payload)
            .pipe(
                map((orders: Order[]) => new orderAction.LoadOrdersSuccess(orders)),
                catchError(err => of( new orderAction.LoadOrdersFail(err)))
            )
        ),
    );
}
