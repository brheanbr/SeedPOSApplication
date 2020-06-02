import { Component, OnInit } from '@angular/core';
import { CompanyAuthService } from 'src/app/_services/company-auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.css']
})
export class CompanyLoginComponent implements OnInit {
  companyModel: any = {};
  constructor(private companyAuth: CompanyAuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    // localStorage.removeItem('companytoken');
  }
  login() {
    this.companyAuth.companyLogin(this.companyModel).subscribe(
      next => {
        this.alertify.success('Successfully Signed In!');
      }, error => {
        this.alertify.error(error);
      } , () => {
        const uniqueName = this.companyAuth.decodedToken.unique_name;
        this.router.navigate(['company' , uniqueName, 'dashboard']);
      }
    );
  }

}
