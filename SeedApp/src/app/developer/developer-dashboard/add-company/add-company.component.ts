import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Company } from 'src/app/_models/company';
import { AdminAuthService } from 'src/app/_services/admin-auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AdminService } from 'src/app/_services/Admin.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
   companies: any[];
   company: Company;
  registerCompany: FormGroup;
  constructor(private fb: FormBuilder, private adminAuth: AdminAuthService, private alertify: AlertifyService,
              private adminService: AdminService) { }

  ngOnInit() {
    this.companies = this.adminService.companies;
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
      this.adminAuth.companyRegister(this.company).subscribe(data => {
        this.alertify.success('Successfully Registered');
        this.registerCompany.reset();
        this.adminService.companies.push(data);
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  cancel() {
    console.log('cancel');
  }

}
