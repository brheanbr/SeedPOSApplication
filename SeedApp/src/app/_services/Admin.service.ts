import { Injectable } from '@angular/core';
import { Company } from '../_models/company';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
companies: any[];
constructor(private http: HttpClient) { }

getCompanies() {
  return this.http.get(environment.baseUrl + 'admin/companies');
}
getEmployees() {
  return this.http.get(environment.baseUrl + 'admin/employees');
}
}
