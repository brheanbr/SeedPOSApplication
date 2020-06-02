import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';


export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'home', component: HomeComponent},
    { path: 'developer', loadChildren: './developer/developer.module#DeveloperModule'},
    { path: 'company', loadChildren: './company/company.module#CompanyModule'},
    // {
    //     path: ':unique_name', resolve: {company: CompanyResolver},
    //     runGuardsAndResolvers: 'always',
    //     canActivate: [CompanyauthGuard],
    //     children: [
    //         {path: 'cashier', component: CashierComponent},
    //         {path: 'dashboard', component: DashboardComponent},
    //         {path: 'departments', component: DepartmentsComponent}
    //     ]
    // },
    { path: '**', redirectTo: 'home'}
];
