import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from 'src/app/_services/admin-auth.service';
import { Company } from 'src/app/_models/company';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

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
  companies: Company[];
  constructor(public adminauth: AdminAuthService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.adminauth.companies = data.companies;
    });
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
