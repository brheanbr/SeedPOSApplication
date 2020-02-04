import { Component, OnInit } from '@angular/core';
import { CompanyAuthService } from 'src/app/_services/company-auth.service';
import { AdminAuthService } from 'src/app/_services/admin-auth.service';
import { AdminService } from 'src/app/_services/Admin.service';
import { Company } from 'src/app/_models/company';
import { Subscription, Observable } from 'rxjs';
import { Employees } from 'src/app/_models/Employees';

import * as fromStore from '../../_store';
import { Store, select } from '@ngrx/store';
import { LoadCompany } from '../../_store/actions/company.action';



@Component({
  selector: 'app-company-setup',
  templateUrl: './company-setup.component.html',
  styleUrls: ['./company-setup.component.css']
})
export class CompanySetupComponent implements OnInit {
  companies$: Observable<Company[]>;
  employees: Employees;
  constructor(public adminService: AdminService, private store: Store<fromStore.ProductState>) { }

  ngOnInit() {
    this.companies$ = this.store.select(store => store.company.data);
    console.log(this.companies$);
    this.store.dispatch(new LoadCompany());
  }

  dataChecker(employees: any) {

    }

}
