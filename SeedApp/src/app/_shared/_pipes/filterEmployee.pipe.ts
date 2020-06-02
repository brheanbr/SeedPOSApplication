import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from 'src/app/_models';
@Pipe({
  name: 'filterEmployees'
})
export class FilterEmployeePipe implements PipeTransform {
    transform(employee: Employee[], searchTerm: string): Employee[] {
        if (!employee || !searchTerm) {
            return employee;
        }

        return employee.filter(employees => employees.FullName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
         || employees.EmployeeType.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
         || employees.Username !== null && employees.Username.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}

