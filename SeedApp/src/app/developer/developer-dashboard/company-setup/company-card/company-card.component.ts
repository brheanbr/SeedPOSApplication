import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Company } from 'src/app/_models/company';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/_services/Admin.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.css']
})
export class CompanyCardComponent implements OnInit {
  @Input() company: Company;
  modalRef: BsModalRef;
  constructor(public adminService: AdminService, private modalService: BsModalService) { }

  ngOnInit() {

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
