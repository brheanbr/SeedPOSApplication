import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../_models/company';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Employee } from '../_models/Employee';
import { Order } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class POSService {
cashier: Employee;
cashierValidator = {};
constructor(private http: HttpClient) { }

  login(model: any= {}) {
    return this.http.post(environment.baseUrl + 'pos/cashier-login', model).pipe(
      map((response: any) => {
        const admin = response;
        if (admin) {
          localStorage.setItem('cashier', JSON.stringify(admin.cashier));
          this.cashier = admin.cashier;
        }
      })
    );
  }

  loggedIn() {
    const cashier = localStorage.getItem('cashier');
    return cashier;
  }


  getCompany( company: string , id: number ): Observable<Company> {
    return this.http.get<Company>(environment.baseUrl + 'pos/' + company + '/' + id);
  }

  loadCompanyProducts(id: string) {
    return this.http.get(environment.baseUrl + 'pos/products/' + id);
  }

  makeOrder(order: Order) {
    return this.http.post(environment.baseUrl + 'pos/make-order', order);
  }
  addOrEditOrder(order: Order) {
    return this.http.put<Order>(environment.baseUrl + 'pos/add-edit-order', order);
  }

  loadUnpaidOrders(id: string) {
    return this.http.get(environment.baseUrl + 'pos/unpaid-orders/' + id);
  }

  checkoutOrder(orderId: string) {
    return this.http.post(environment.baseUrl + 'pos/checkout-order/' + orderId , {});
  }
  print() {
    window.print();

  }


}
