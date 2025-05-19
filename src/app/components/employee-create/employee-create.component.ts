import { Component } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-create',
  imports: [FormsModule],
  templateUrl: './employee-create.component.html',
  styleUrl: './employee-create.component.css'
})
export class EmployeeCreateComponent {
    newEmployee: Omit<Employee, 'id'> & { id?: number } = {
    name: '',
    birthday: '',
    hasCar: false,
    address: '',
    attributes: [] // Optional
  };
  
  constructor(private employeeService: EmployeeService){}


  addEmployee(): void {
    this.employeeService.createEmployee(this.newEmployee).subscribe({
      next: (employee) => {
        console.log('Employee created:', employee);
        // Reset form
        this.newEmployee = {
          name: '',
          birthday: '',
          hasCar: false,
          address: '',
          attributes: []
        };

      },
      error: (err) => console.error('Error creating employee:', err)
    });
  }
}
