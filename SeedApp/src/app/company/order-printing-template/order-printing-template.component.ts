import { Component, OnInit, Output, Input } from '@angular/core';
import { Product, Order } from 'src/app/_models';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../_store';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-order-printing-template',
  templateUrl: './order-printing-template.component.html',
  styleUrls: ['./order-printing-template.component.css']
})
export class OrderPrintingTemplateComponent implements OnInit {
  // @Input() orderToPrint$: Order;
  orderToPrint$: Observable<Order>;
  constructor(public orderStore: Store<fromStore.ProductAction> , public dialogRef: MatDialogRef<OrderPrintingTemplateComponent>) { }

  ngOnInit() {
    this.orderToPrint$ = this.orderStore.pipe(select(fromStore.getLatestOrder));
  }
  print() {
    window.print();
    this.dialogRef.close();
  }
}
