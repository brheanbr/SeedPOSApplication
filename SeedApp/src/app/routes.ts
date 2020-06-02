import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';


export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'home', component: HomeComponent},
    { path: 'developer', loadChildren: () => import('./developer/developer.module').then(m => m.DeveloperModule)},
    { path: 'company', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule)},
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
