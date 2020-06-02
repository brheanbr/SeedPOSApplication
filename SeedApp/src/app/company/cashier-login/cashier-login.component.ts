import { Component, OnInit } from '@angular/core';
import { POSService } from 'src/app/_services/POS.service';
import { CompanyAuthService } from 'src/app/_services/company-auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-cashier-login',
  templateUrl: './cashier-login.component.html',
  styleUrls: ['./cashier-login.component.css']
})
export class CashierLoginComponent implements OnInit {

  cashierModel: any = {};
  username: string;
  password: string;
  constructor(private posService: POSService, private companyAuth: CompanyAuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }
  login() {
    this.cashierModel = {username: this.username, password: this.password , companyId: this.companyAuth.decodedToken.nameid};
    this.posService.login(this.cashierModel).subscribe(
      next => {
        this.alertify.success('Successfully Signed In!');
      }, error => {
        this.alertify.error(error);
      }
    );
  }

}
