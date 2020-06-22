import { Component, OnInit } from '@angular/core';
import { POSService } from 'src/app/_services/POS.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { CompanyAuthService } from 'src/app/_services/company-auth.service';
import { Order } from 'src/app/_models/Order';
import { MatTableDataSource } from '@angular/material/table';
import * as fromStore from '../_store';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/_models';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.css']
})
export class CashierComponent implements OnInit {
  products$: Observable<Product[]>;

  dateNow = new Date();
  orders: Array<Order> = [];
  subTotal = 0;
  grandTotal = 0;
  newOrder: any = {};
  // customerNumber: string;
  displayedColumns = ['Qty', 'Item', 'Price', 'Total', 'Action'];
  dataSource = new MatTableDataSource(this.orders);
  searchText: string;
  searchType: string;
  itemsPerSlide = 3;
  singleSlideOffset = true;
  noWrap = true;
  itemType = ['Others', 'Beverages' , 'Soup', 'Salad', 'Burger', 'Chicken', 'Fish', 'Beef', 'Pork', 'Seafoods',
              'Vegetable', 'Appetizer', 'Bayanihan', 'Dessert', 'Merienda Special', 'Sizzling Choice', 'Rice Toppings'];

  orderForm: FormGroup;

  constructor(public posService: POSService, public alertify: AlertifyService,
              public companyAuth: CompanyAuthService, public productStore: Store<fromStore.ProductAction>,
              public fb: FormBuilder) { }

  ngOnInit() {
    setInterval(() => {
      this.dateNow = new Date();
    }, 1000);
    this.productStore.dispatch(new fromStore.LoadProduct(this.companyAuth.decodedToken.nameid));
    this.products$ = this.productStore.pipe(select(fromStore.getPOSProducts));
    this.createOrderForm();
  }

  createOrderForm() {
    this.orderForm = this.fb.group({
      customerNumber: ['', Validators.required],
      transaction: ['', Validators.required],
      companyId: [this.companyAuth.decodedToken.nameid],
      products: [this.dataSource.data],
      vat: [''],
      discount: [''],
      isPaid: [false]
    });
  }
  makeOrder() {
    this.orderForm.addControl('cashierId', new FormControl(this.getCashierId()));
    this.orderForm.addControl('subTotal', new FormControl(this.getSubTotal()));
    this.orderForm.addControl('grandTotal', new FormControl(this.getGrandTotal()));
    const order = Object.assign({}, this.orderForm.value);
    console.log(order);
  }

  cashierLoggedin() {
    return this.posService.loggedIn();
  }
  getCustomerNumber() {
    const order = Object.assign({}, this.orderForm.value);
    return order.customerNumber;
  }
  qtyAdd(x) {
    this.orders[x].qty = this.orders[x].qty + 1;
    this.orders[x].total = this.orders[x].qty * this.orders[x].price;
    this.subTotal = this.getSubTotal();
    this.grandTotal = this.getGrandTotal();
  }
  qtyMinus(x) {
    if (this.orders[x].qty > 1) {
      this.orders[x].qty = this.orders[x].qty - 1;
      this.orders[x].total = this.orders[x].qty * this.orders[x].price;
    }
    this.subTotal = this.getSubTotal();
    this.grandTotal = this.getGrandTotal();
  }
  removeOrder(z) {
    this.orders.splice(z, 1);
    this.dataSource._updateChangeSubscription();
    this.subTotal = this.getSubTotal();
    this.grandTotal = this.getGrandTotal();
  }
  addOrder(order: Product) {
    const q = 1;
    this.newOrder = {qty: q, item: order.ProductName, price: order.Price, total : order.Price * q };
    this.orders.push(this.newOrder);
    this.newOrder = {};
    this.dataSource._updateChangeSubscription();
    this.subTotal = this.getSubTotal();
    this.grandTotal = this.getGrandTotal();
  }
  getCashierId() {
    return this.posService.cashier.EmployeeId;
  }
  getSubTotal() {
    return this.orders.reduce((acc, orders) => acc + orders.total, 0);
  }
  getGrandTotal() {
    const order = Object.assign({}, this.orderForm.value);
    const total = this.orders.reduce((acc, orders) => acc + orders.total, 0);
    const discount = total * order.discount;
    const grandTotal = total - discount;
    this.grandTotal = grandTotal;
    return grandTotal;
  }
  logout() {
    localStorage.removeItem('cashier');
    this.alertify.success('Successfully Signed Out!');
  }
}
