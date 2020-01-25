import { Component, OnInit, Output, Input } from '@angular/core';
import { Employees } from 'src/app/_models/Employees';
import { AdminService } from 'src/app/_services/Admin.service';

@Component({
  selector: 'app-company-employee',
  templateUrl: './company-employee.component.html',
  styleUrls: ['./company-employee.component.css']
})
export class CompanyEmployeeComponent implements OnInit {

  employeesList: Employees[];
  constructor(public adminservice: AdminService) { }

  ngOnInit() {
  }

}
