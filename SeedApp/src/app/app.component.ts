import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AdminAuthService } from './_services/admin-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  jtwHelper = new JwtHelperService();

  constructor(private adminauth: AdminAuthService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.adminauth.decodedToken = this.jtwHelper.decodeToken(token);
    }
  }
}
