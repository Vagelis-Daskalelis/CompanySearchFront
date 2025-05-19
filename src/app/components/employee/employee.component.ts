import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeUpdateDTO } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  imports: [NgClass, NgIf, NgFor, FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  employees: Employee[] = [];


  newEmployee: Omit<Employee, 'id'> & { id?: number } = {
  name: '',
  birthday: '',
  hasCar: false,
  address: '',
  attributes: [] // Optional
};

  constructor(private employeeService: EmployeeService){}


  isLoading = false;
  error: string | null = null;

  // Get all employees

  fetchEmployees(): void {
    this.isLoading = true;
    this.error = null;

    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
        this.error = 'Failed to load employees';
        this.isLoading = false;
      }
    });
  }

  // Insert employee

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
        // Optionally refresh employee list
        this.fetchEmployees();
      },
      error: (err) => console.error('Error creating employee:', err)
    });
  }

  // Delete employee

  deleteEmployee(id: number): void {
  this.employeeService.deleteEmployee(id).subscribe({
    next: () => {
      console.log(`Employee with ID ${id} deleted.`);
      this.fetchEmployees(); // Refresh list
    },
    error: (err) => console.error('Error deleting employee:', err)
  });
}

  // Update employee

selectedEmployee: Employee | null = null;

employeeForm: EmployeeUpdateDTO = {
  id: 0,
  name: '',
  birthday: '',
  hasCar: false,
  address: ''
};
updateEmployee(): void {
  if (!this.employeeForm.id) {
    console.error('No employee selected for update.');
    return;
  }

  this.employeeService.updateEmployee(this.employeeForm).subscribe({
    next: (updated) => {
      console.log('Employee updated:', updated);
      this.fetchEmployees(); // refresh list
      this.cancelEdit();     // reset form
    },
    error: (err) => {
      console.error('Error updating employee:', err);
    }
  });
}

cancelEdit(): void {
  this.selectedEmployee = null;
  this.employeeForm = {
    id: 0,
    name: '',
    birthday: '',
    hasCar: false,
    address: ''
  };
}

editEmployee(emp: Employee): void {
  this.selectedEmployee = emp;
  this.employeeForm = { ...emp };
}

  // Get one employee

  detailedEmployee: any = null;

viewEmployeeDetails(id: number): void {
  this.employeeService.getEmployeeById(id).subscribe({
    next: (employee) => {
      this.detailedEmployee = employee;
    },
    error: (err) => {
      console.error('Error fetching employee details:', err);
      this.detailedEmployee = null;
    }
  });
}

closeDetails(): void {
  this.detailedEmployee = null;
}

}

