import { Component, OnInit, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { Company } from 'src/app/_models/company';
import { Subscription } from 'src/app/_models/Subscription';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertifyService } from 'src/app/_services/alertify.service';
import * as fromStore from '../../../_store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.css']
})
export class CompanyCardComponent implements OnInit {
  @Input() company$;
  subs: Subscription;
  modalRef: BsModalRef;
  constructor(private store: Store<fromStore.CompanyAction>, private modalService: BsModalService,
              public alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(id): void {
    this.deleteCompany(id);
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  // getEmployee() {
  //   this.adminService.getEmployees().subscribe(data => {
  //     this.passEmpValue.emit(data);
  //     this.alertify.message('Succesfully Retrieved!');
  //   }, error => {
  //     this.alertify.error('Problem Retrieving data!');
  //   });
  // }

  deleteCompany(id) {
    this.store.dispatch(new fromStore.DeleteCompany(id));
  }
  getCompany(id) {
    this.router.navigate(['/developer/company', id]);
  }
}
