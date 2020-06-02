import { CompanyEffects } from './company.effects';
import { ProductEffects } from './products.effects';
import { EmployeeEffects } from './employee.effects';


export const effects: any[] = [CompanyEffects, ProductEffects, EmployeeEffects];

export * from './company.effects';
export * from './products.effects';
export * from './employee.effects';
