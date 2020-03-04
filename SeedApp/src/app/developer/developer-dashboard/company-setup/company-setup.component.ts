import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/Admin.service';
import { Observable } from 'rxjs';
import { Employees } from 'src/app/_models/Employees';

import * as fromStore from '../../_store';
import { Store } from '@ngrx/store';
import { Company } from 'src/app/_models/Company';


@Component({
  selector: 'app-company-setup',
  templateUrl: './company-setup.component.html',
  styleUrls: ['./company-setup.component.css']
})
export class CompanySetupComponent implements OnInit {
  company$: Observable<Company[]>;
  employees: Employees;
  constructor(public store: Store<fromStore.ProductState>) { }

  ngOnInit() {
     this.company$ = this.store.select(fromStore.getCompanies);
     console.log(this.company$);
  }

  dataChecker(employees: any) {

    }

}
