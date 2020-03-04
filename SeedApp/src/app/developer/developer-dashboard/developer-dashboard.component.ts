import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from 'src/app/_services/admin-auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/_services/Admin.service';
import * as fromStore from '../_store';
import { Store } from '@ngrx/store';
import { LOAD_COMPANY } from '../_store';

@Component({
  selector: 'app-developer-dashboard',
  templateUrl: './developer-dashboard.component.html',
  styleUrls: ['./developer-dashboard.component.css']
})
export class DeveloperDashboardComponent implements OnInit {
  customClass = 'customClass';
  addCompanyOpen = false;
  companySetupOpen = false;
  isContentOpen = true;
  constructor(public adminService: AdminService, public adminAuth: AdminAuthService,
              private alertify: AlertifyService, private route: ActivatedRoute,
              private store: Store<fromStore.CompanyAction>
              ) { }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadCompanies());
  }
  checkerAddCompany() {
    if (this.addCompanyOpen === true) {
      this.companySetupOpen = false;
    }
  }
  checkerCompanySetup() {
    if (this.companySetupOpen === true) {
      this.addCompanyOpen = false;
    }
  }





}
