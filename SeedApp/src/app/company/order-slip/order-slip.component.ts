import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderList } from 'src/app/_models/OrderList';
import { MatTableDataSource } from '@angular/material/table';
import * as fromStore from '../_store';
import { Store, select } from '@ngrx/store';
import { CompanyAuthService } from 'src/app/_services/company-auth.service';
import { Observable } from 'rxjs';
import { Order } from 'src/app/_models';

@Component({
  selector: 'app-order-slip',
  templateUrl: './order-slip.component.html',
  styleUrls: ['./order-slip.component.css']
})
export class OrderSlipComponent implements OnInit {
  @Input() orders$;
  @Output() selectedOrder$ = new EventEmitter();
  // orders$: Observable<Order[]>;
  displayedColumns = ['Qty', 'Item', 'Price', 'Total'];
  dataSource = new MatTableDataSource();

  constructor(public orderStore: Store<fromStore.OrderActions>, public companyAuth: CompanyAuthService) { }

  ngOnInit() {
    // this.orderStore.dispatch(new fromStore.LoadOrders(this.companyAuth.decodedToken.nameid));
    // this.orders$ = this.orderStore.pipe(select(fromStore.getUnpaidOrders));
  }
  checkout(orderId: string) {
    this.orderStore.dispatch(new fromStore.CheckOutOrder(orderId));
  }
  addOrder(orderToReturn: Order) {
    this.selectedOrder$.emit(orderToReturn);
  }

}
