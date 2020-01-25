import { Component, OnInit } from '@angular/core';
import { CompanyAuthService } from 'src/app/_services/company-auth.service';
import { AdminAuthService } from 'src/app/_services/admin-auth.service';
import { AdminService } from 'src/app/_services/Admin.service';
import { Company } from 'src/app/_models/company';
import { Subscription } from 'rxjs';
import { Employees } from 'src/app/_models/Employees';

@Component({
  selector: 'app-company-setup',
  templateUrl: './company-setup.component.html',
  styleUrls: ['./company-setup.component.css']
})
export class CompanySetupComponent implements OnInit {
  companies: Company[];
  employees: Employees;
  constructor(public adminService: AdminService) { }

  ngOnInit() {
    this.companies = this.adminService.companies;
    this.employees = this.adminService.employees;
  }

  dataChecker(employees: any) {
      console.log(this.employees);
    }

}
