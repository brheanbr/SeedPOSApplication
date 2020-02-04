import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/_models/company';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  company: any;
  constructor(private route: ActivatedRoute, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.company = data.company;
      //this.checkIfNull();
    });
  }

  checkIfNull() {
    if (this.company) {
      this.alertify.success('Loaded Sucessfully!');
    } else {
      this.alertify.error('User not Available!');
      this.router.navigate(['/home']);
    }
  }

}
