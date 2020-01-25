import { Component, OnInit, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { Company } from 'src/app/_models/company';
import { Subscription } from 'src/app/_models/Subscription';
import { AdminService } from 'src/app/_services/Admin.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Employees } from 'src/app/_models/Employees';

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.css']
})
export class CompanyCardComponent implements OnInit {
  @Input() company: Company;
  @Output() passEmpValue = new EventEmitter();
  subs: Subscription;
  constructor(public adminService: AdminService, private modalService: BsModalService, public alertify: AlertifyService) { }

  ngOnInit() {

  }

  getEmployee() {
    this.adminService.getEmployees().subscribe(data => {
      this.passEmpValue.emit(data);
      this.alertify.message('Succesfully Retrieved!');
    }, error => {
      this.alertify.error('Problem Retrieving data!');
    });
  }
}
