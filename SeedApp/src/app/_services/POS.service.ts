import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../_models/company';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class POSService {

constructor(private http: HttpClient) { }

  getCompany( company: string , id: number ): Observable<Company> {
    return this.http.get<Company>(environment.baseUrl + 'pos/' + company + '/' + id);
  }

}
