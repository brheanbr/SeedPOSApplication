import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from '../_services/admin-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private adminauth: AdminAuthService, private router: Router) { }

  ngOnInit() {
    if (this.adminauth.loggedIn()) {
      this.router.navigate(['developer-dashboard']);
    }
  }

}
