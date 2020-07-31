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
import { DatePipe, formatDate } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { OrderList } from 'src/app/_models/OrderList';
import { MatTabGroup } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { OrderPrintingTemplateComponent } from '../order-printing-template/order-printing-template.component';

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.css']
})
export class CashierComponent implements OnInit {
  products$: Observable<Product[]>;
  unPaidOrders$: Observable<Order[]>;
  orderToPrint$: Observable<Order>;
  newOrderLoaded$: boolean;
  dateNow = new Date();
  orders: Array<OrderList> = [];
  subTotal = 0;
  grandTotal = 0;
  newOrder: any = {};
  selectedTabIndex: number;
  displayedColumns = ['Qty', 'Item', 'Price', 'Total', 'Action'];
  dataSource = new MatTableDataSource(this.orders);
  searchText: string;
  searchType: string;
  itemsPerSlide = 1;
  singleSlideOffset = true;
  noWrap = true;
  itemType = ['Others', 'Beverages' , 'Soup', 'Salad', 'Burger', 'Chicken', 'Fish', 'Beef', 'Pork', 'Seafoods',
              'Vegetable', 'Appetizer', 'Bayanihan', 'Dessert', 'Merienda Special', 'Sizzling Choice', 'Rice Toppings'];

  orderForm: FormGroup;
  showFiller = false;
  options: FormGroup;

  constructor(public posService: POSService, public alertify: AlertifyService,
              public companyAuth: CompanyAuthService, public productStore: Store<fromStore.ProductAction>,
              public orderStore: Store<fromStore.OrderActions>,
              public fb: FormBuilder, public dialog: MatDialog) { }

  ngOnInit() {
    setInterval(() => {
      this.dateNow = new Date();
    }, 1000);
    this.productStore.dispatch(new fromStore.LoadProduct(this.companyAuth.decodedToken.nameid));
    this.products$ = this.productStore.pipe(select(fromStore.getPOSProducts));
    // this.orderStore.dispatch(new fromStore.LoadOrders(this.companyAuth.decodedToken.nameid));
    // this.unPaidOrders$ = this.orderStore.pipe(select(fromStore.getUnpaidOrders));
    this.orderToPrint$ = this.orderStore.pipe(select(fromStore.getLatestOrder));
    this.createOrderForm();
  }

  createOrderForm() {
    this.orderForm = this.fb.group({
      customerNumber: ['', Validators.required],
      transaction: [''],
      companyId: [this.companyAuth.decodedToken.nameid],
      orderLists: [this.dataSource.data],
      vat: [''],
      discount: [''],
      isPaid: [false],
      dateOrdered: [this.dateNow.toLocaleString()]
    });
    this.orderForm.get('discount').setValue('0');
    this.orderForm.get('vat').setValue('0');
  }
  makeOrder() {
    this.orderForm.addControl('employeeId', new FormControl(this.getCashierId()));
    this.orderForm.addControl('subTotal', new FormControl(this.getSubTotal()));
    this.orderForm.addControl('grandTotal', new FormControl(this.getGrandTotal()));
    const order = Object.assign({}, this.orderForm.value);
    console.log(order);
    if (order.orderId != null) {
      this.posService.addOrEditOrder(order).subscribe(
        () => {
          this.alertify.success('Registration succesful');
        },
        error => {
          this.alertify.error(error);
        }
      );
    } else {
      this.orderStore.dispatch(new fromStore.AddOrder(order));
    }
    this.resetOrderForm();
    this.openDialog();
  }
  openDialog() {
    this.dialog.open(OrderPrintingTemplateComponent, {disableClose: true});
  }
  checkOrderToAddOrEdit() {
    const order =  Object.assign({}, this.orderForm.value);
    if (order.orderId != null) {
      return true;
    } else {
      return false;
    }
  }
  editOrder(order: Order) {
    for (let x = 0 ; x < order.OrderLists.length ; x++) {
      this.orders[x] = order.OrderLists[x];
    }
    // this.orders = order.OrderLists;
    this.dataSource._updateChangeSubscription();
    this.orderForm = this.fb.group({
      customerNumber: [order.CustomerNumber],
      transaction: [order.Transaction],
      companyId: [order.CompanyId],
      orderLists: [this.dataSource.data],
      vat: [''],
      discount: [''],
      isPaid: [order.IsPaid],
      dateOrdered: [order.DateOrdered]
    });
    this.orderForm.addControl('orderId', new FormControl(order.OrderId));
    this.orderForm.get('discount').setValue(order.Discount.toString());
    this.orderForm.get('vat').setValue(order.Vat.toString());
    this.orderForm.addControl('employeeId', new FormControl(this.getCashierId()));
    this.orderForm.addControl('subTotal', new FormControl(this.getSubTotal()));
    this.orderForm.addControl('grandTotal', new FormControl(this.getGrandTotal()));
  }
  tabLoader(event) {
    const selectedTabChange = event.tab;
    if (selectedTabChange.textLabel === 'Orders') {
      this.orderStore.dispatch(new fromStore.LoadOrders(this.companyAuth.decodedToken.nameid));
      this.unPaidOrders$ = this.orderStore.pipe(select(fromStore.getUnpaidOrders));
    }
  }
  resetOrderForm() {
    this.orderForm.reset();
    this.orders = [];
    this.dataSource = new MatTableDataSource(this.orders);
    this.dataSource._updateChangeSubscription();
    this.createOrderForm();
    this.getGrandTotal();
    this.subTotal = this.getSubTotal();
    this.orderForm.get('discount').setValue('0');
    this.orderForm.get('vat').setValue('0');
  }
  qtyAdd(x) {
    this.orders[x].Qty = this.orders[x].Qty + 1;
    this.orders[x].Total = this.orders[x].Qty * this.orders[x].Price;
    this.subTotal = this.getSubTotal();
    this.grandTotal = this.getGrandTotal();
  }
  qtyMinus(x) {
    if (this.orders[x].Qty > 1) {
      this.orders[x].Qty = this.orders[x].Qty - 1;
      this.orders[x].Total = this.orders[x].Qty * this.orders[x].Price;
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
    this.newOrder = {Qty: q, Item: order.ProductName, Price: order.Price, Total : order.Price * q };
    this.orders.push(this.newOrder);
    this.newOrder = {};
    this.dataSource._updateChangeSubscription();
    this.subTotal = this.getSubTotal();
    this.grandTotal = this.getGrandTotal();
  }
  getOrderId() {
    const order = Object.assign({}, this.orderForm.value);
    return order.orderId;
  }
  getCustomerNumber() {
    const order = Object.assign({}, this.orderForm.value);
    return order.customerNumber;
  }
  getCashierId() {
    return this.posService.cashier.EmployeeId;
  }
  getSubTotal() {
    this.subTotal = this.orders.reduce((acc, orders) => acc + orders.Total, 0);
    return this.subTotal;
  }
  getGrandTotal() {
    const order = Object.assign({}, this.orderForm.value);
    const total = this.orders.reduce((acc, orders) => acc + orders.Total, 0);
    const discount = total * order.discount;
    const grandTotal = total - discount;
    this.grandTotal = grandTotal;
    return grandTotal;
  }
  logout() {
    localStorage.removeItem('cashier');
    this.alertify.success('Successfully Signed Out!');
  }
  cashierLoggedin() {
    return this.posService.loggedIn();
  }
}
