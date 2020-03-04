import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../../_store';
import { Observable } from 'rxjs';
import { Company } from 'src/app/_models/company';
import { map } from 'rxjs/operators';
import * as companyReducer from '../../../_store/reducer/company.reducer';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
  selectedCompany$: Observable<Company>;
  asd: Company;
  // company$: any;
  cosm: Company;

  constructor(private store: Store<fromStore.CompanyAction>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadCompany(this.route.snapshot.paramMap.get('companyId')));
    this.selectedCompany$ = this.store.pipe(select(fromStore.getCompany));
    console.log(this.selectedCompany$);
  }

}
