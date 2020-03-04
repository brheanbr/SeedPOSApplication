// import { Injectable } from '@angular/core';
// import { Company } from 'src/app/_models/company';
// import { Store } from '@ngrx/store';
// import * as fromStore from '../_store';
// import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { Observable } from 'rxjs';

// @Injectable()
// export class CompanyDetailsResolver implements Resolve<Company> {
//     constructor(private store: Store<fromStore.ProductState>) {}

//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Company> {
//         this.company$ = this.store.select(fromStore.getCompanyEntities);
//     }
// }
