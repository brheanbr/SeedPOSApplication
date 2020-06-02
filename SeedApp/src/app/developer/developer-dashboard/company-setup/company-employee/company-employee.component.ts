import { Component, OnInit, Output, Input } from '@angular/core';
import { Employee } from 'src/app/_models/Employee';
import { AdminService } from 'src/app/_services/Admin.service';

@Component({
  selector: 'app-company-employee',
  templateUrl: './company-employee.component.html',
  styleUrls: ['./company-employee.component.css']
})
export class CompanyEmployeeComponent implements OnInit {

  employeesList: Employee[];
  constructor(public adminservice: AdminService) { }

  ngOnInit() {
  }

}
