import { Order } from 'src/app/_models';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as fromOrder from '../_actions/order.actions';


export interface OrderState extends EntityState<Order> {
    loaded: boolean;
    loading: boolean;
    error: string;
    orderToPrint: Order;
}

export const orderAdapter: EntityAdapter<Order> = createEntityAdapter <Order> ({
    selectId: order => order.OrderId
});

export const defaultOrder: OrderState = {
    ids: [],
    entities: {},
    loaded: false,
    loading: false,
    error: undefined,
    orderToPrint: undefined
};

export const initalState = orderAdapter.getInitialState(defaultOrder);

export function orderReducer(state = initalState, action: fromOrder.OrderActions): OrderState {
    switch (action.type) {
        case fromOrder.ADD_ORDER_SUCCESS: {
            return orderAdapter.addOne(action.payload, {
                ...state,
                loading: false,
                loaded: true,
                error: undefined,
                orderToPrint: action.payload
            });
        }
        case fromOrder.ADD_ORDER_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload
            };
        }
        case fromOrder.LOAD_ORDERS_SUCCESS: {
            return orderAdapter.addAll(action.payload, {
                ...state,
                loaded: true,
                loading: false,
                error: undefined
            });
        }
        case fromOrder.LOAD_ORDERS_FAIL: {
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
