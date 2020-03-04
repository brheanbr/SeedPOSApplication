import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Company } from 'src/app/_models/company';
import { AdminAuthService } from 'src/app/_services/admin-auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AdminService } from 'src/app/_services/Admin.service';
import * as fromStore from '../../_store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
   companies$: Observable<Company[]>;
  //  company$: Observable<Company>;
   company$: any;
   company: Company;
  registerCompany: FormGroup;
  constructor(private fb: FormBuilder, private adminAuth: AdminAuthService, private alertify: AlertifyService,
              private adminService: AdminService, private store: Store<fromStore.CompanyAction>) { }

  ngOnInit() {
    this.companies$ = this.store.select(fromStore.getCompanies);
    // this.company$ = this.store.select(fromStore.getCompany);
    console.log(this.companies$);
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerCompany = this.fb.group ({
      companyUsername: ['', Validators.required],
      companyPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      companyName: ['', Validators.required],
      companyOwner: ['', Validators.required],
      contactNumber: ['', Validators.required],
      companyAddress: ['', Validators.required]
    });
  }

  register() {
    if (this.registerCompany.valid) {
      this.company = Object.assign({}, this.registerCompany.value);
      // this.adminAuth.companyRegister(this.company).subscribe(data => {
      //   this.alertify.success('Successfully Registered');
      //   this.registerCompany.reset();
      //   this.adminService.companies.push(data);
      // }, error => {
      //   this.alertify.error(error);
      // });
      this.store.dispatch(new fromStore.AddCompany(this.company));
    }
  }

  load(id) {
    this.company$ = this.store.dispatch(new fromStore.LoadCompany(id));
    // this.company$ = this.store.select(fromStore.getCompany);
  }

  cancel() {
    console.log('cancel');
  }

}
