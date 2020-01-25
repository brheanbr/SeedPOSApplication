import { Injectable } from '@angular/core';
import { Company } from '../_models/company';
import { Subscription } from '../_models/subscription';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Employees } from '../_models/Employees';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
companies: any[];
employees: any;
constructor(private http: HttpClient) { }

getCompanies() {
  return this.http.get(environment.baseUrl + 'admin/companies');
}
getEmployees() {
  return this.http.get(environment.baseUrl + 'admin/employees');
}
}
