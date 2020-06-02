import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { POSService } from 'src/app/_services/POS.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { CompanyAuthService } from 'src/app/_services/company-auth.service';
import { Order } from 'src/app/_models/Order';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.css']
})
export class CashierComponent implements OnInit {
  orders: Array<Order> = [];
  newOrder: any = {};
  customerNumber: string;
  displayedColumns = ['Qty', 'Item', 'Price', 'Total', 'Action'];
  @ViewChildren(MatTable) table: MatTable<any>;

  // orders = [
  //   {position: 1, name: 'Hydrssssssssss', weight: 1.0079, symbol: 'H1212'},
  //   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  //   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  //   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  //   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  //   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  //   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  //   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  //   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  //   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne88'},
  // ];
  constructor(public posService: POSService, public alertify: AlertifyService, public companyAuth: CompanyAuthService) { }

  ngOnInit() {
    const x = {qty: 1, item: 'test', price: 200, total : 200 };
    this.orders.push(x);
  }
  cashierLoggedin() {
    return this.posService.loggedIn();
  }
  qtyAdd(x) {
    this.orders[x].qty = this.orders[x].qty + 1;
  }
  qtyMinus(x) {
    if (this.orders[x].qty > 0) {
      this.orders[x].qty = this.orders[x].qty - 1;
    }
  }
  removeOrder(z) {
    this.orders.splice(z, 1);
    this.table.renderRows();
  }
  addOrder(i) {
    console.log(i);
    this.newOrder = {qty: 2, item: 'tasdest', price: 200, total : 200 };
    this.orders.push(this.newOrder);
    this.newOrder = {};
    console.log(this.orders);
    this.table.renderRows();
  }


}
