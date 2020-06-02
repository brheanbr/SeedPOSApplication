import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AdminAuthService } from './_services/admin-auth.service';
import { CompanyAuthService } from './_services/company-auth.service';
import { Store } from '@ngrx/store';
import * as fromStore from './developer/_store/';
import { POSService } from './_services/POS.service';
import { Employee } from './_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  jtwHelper = new JwtHelperService();

  constructor(private adminAuth: AdminAuthService, private companyAuth: CompanyAuthService, private store: Store<fromStore.ProductState>,
              private POS: POSService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const companytoken = localStorage.getItem('companytoken');
    const cashier: Employee = JSON.parse(localStorage.getItem('cashier'));
    if (token) {
      this.adminAuth.decodedToken = this.jtwHelper.decodeToken(token);
    }
    if (companytoken) {
      this.companyAuth.decodedToken = this.jtwHelper.decodeToken(companytoken);
    }
    if (cashier) {
      this.POS.cashier = cashier;
    }
  }
}
