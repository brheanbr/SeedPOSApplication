import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from '../_services/admin-auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { CompanyAuthService } from '../_services/company-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;
  constructor(private adminAuth: AdminAuthService, private router: Router, private alertify: AlertifyService,
              public companyAuth: CompanyAuthService) { }
  ngOnInit() {
  }
  loggedin() {
    return this.adminAuth.loggedIn();
  }
  companyLoggedin() {
    return this.companyAuth.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('companytoken');
    localStorage.removeItem('cashier');
    this.alertify.success('Successfully Signed Out!');
    this.adminAuth.decodedToken = null;
    this.router.navigate(['/home']);
  }
  brandBtn() {
    if (this.companyLoggedin()) {
      this.router.navigate(['/home']);
    }
  }

}
