import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AdminAuthService } from './_services/admin-auth.service';
import { CompanyAuthService } from './_services/company-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  jtwHelper = new JwtHelperService();

  constructor(private adminAuth: AdminAuthService, private companyAuth: CompanyAuthService) {}

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    const token = localStorage.getItem('token');
    const companytoken = localStorage.getItem('companytoken');
    if (token) {
      this.adminAuth.decodedToken = this.jtwHelper.decodeToken(token);
    }
    if (companytoken) {
      this.companyAuth.decodedToken = this.jtwHelper.decodeToken(companytoken);
    }
  }
}
