import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from 'src/app/_services/admin-auth.service';

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
  constructor(public adminauth: AdminAuthService) { }

  ngOnInit() {
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
