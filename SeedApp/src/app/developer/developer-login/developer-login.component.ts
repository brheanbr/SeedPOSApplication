import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from 'src/app/_services/admin-auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-developer-login',
  templateUrl: './developer-login.component.html',
  styleUrls: ['./developer-login.component.css']
})
export class DeveloperLoginComponent implements OnInit {
  adminModel: any = {};
  jtwHelper = new JwtHelperService();
  companyAuth: any;

  constructor(private adminAuth: AdminAuthService, private router: Router, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  login() {
    this.adminAuth.adminLogin(this.adminModel).subscribe(
      next => {
        this.alertify.success('Successfully Signed In!');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.router.navigate(['/developer/developer-dashboard']);
      }
    );
  }



}
