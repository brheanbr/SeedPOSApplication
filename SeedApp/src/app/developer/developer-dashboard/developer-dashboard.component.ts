import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from 'src/app/_services/admin-auth.service';
import { Company } from 'src/app/_models/company';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/_services/Admin.service';

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
              private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.route.data.subscribe(data => {
    //   this.adminService.companies = data.company;
    // });
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
