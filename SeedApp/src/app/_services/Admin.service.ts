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
companies: Company[];
employees: any;
constructor(private http: HttpClient) { }

getCompanies() {
  return this.http.get<Company[]>(environment.baseUrl + 'admin/companies');
}
getCompany(id: number) {
  return this.http.get<Company>(environment.baseUrl + 'admin/company/' + id);
}
getEmployees() {
  return this.http.get(environment.baseUrl + 'admin/employees');
}
deleteCompany(id: number) {
  return this.http.delete(environment.baseUrl + 'admin/' + id);
}
companyRegister(company: Company) {
  return this.http.post(environment.baseUrl + 'adminauth/register-company', company);
}
}
