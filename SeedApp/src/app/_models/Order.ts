import { OrderList } from './OrderList';
import { Employee } from './Employee';

export interface Order {

    OrderId: number;
    EmployeeId: number;
    Employee: Employee;
    CompanyId: number;
    OrderLists: OrderList[];
    CustomerNumber: string;
    Transaction: string;
    Discount: number;
    Vat: number;
    Subtotal: number;
    GrandTotal: number;
    IsPaid: boolean;
    DateOrdered: Date;
}
