import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeUpdateDTO } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Attribute } from '../../models/attribute';
import { AttributeService } from '../../services/attribute.service';

@Component({
  selector: 'app-employee',
  imports: [NgClass, NgIf, NgFor, FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  employees: Employee[] = [];




  constructor(private employeeService: EmployeeService, private attributeService: AttributeService){}


  isLoading = false;
  error: string | null = null;

  // Get all employees

  fetchEmployees(): void {
  this.isLoading = true;
  this.error = null;

  this.employeeService.getEmployees().subscribe({
    next: (data) => {
      this.employees = data;

      // For each employee, fetch their attributes separately
      this.employees.forEach(emp => {
        this.employeeService.getAttributesByEmployee(emp.id!).subscribe(attrs => {
          emp.attributes = attrs.map(a => `${a.name}: ${a.value}`);
        });
      });

      this.isLoading = false;
    },
    error: (err) => {
      console.error('Error fetching employees:', err);
      this.error = 'Failed to load employees';
      this.isLoading = false;
    }
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

closeDetails(): void {
  this.detailedEmployee = null;
}


// Required data
allAttributes: Attribute[] = [];
selectedAttributeIdToInsert: number | null = null;

// Load all attributes once (for dropdown)
fetchAllAttributes(): void {
  this.attributeService.getAttributes().subscribe(attrs => {
    this.allAttributes = attrs;
  });
}



// Load detailed employee + attributes
viewEmployeeDetails(id: number): void {
  this.employeeService.getEmployeeById(id).subscribe({
    next: (emp) => {
      this.detailedEmployee = emp;
      // Fetch attributes for this employee
      this.employeeService.getAttributesByEmployee(id).subscribe(attrs => {
        this.detailedEmployee!.attributes = attrs.map(a => `${a.name}: ${a.value}`);
      });
    },
    error: (err) => {
      console.error('Error fetching employee details:', err);
      this.detailedEmployee = null;
    }
  });
}

  // Adds attribute to employee
addAttributeToEmployee(employeeId: number, attributeId: number | null): void {
  if (!attributeId) return;
  this.employeeService.addAttributeToEmployee(employeeId, attributeId).subscribe({
    next: () => {
      // Refresh employee details and list
      this.viewEmployeeDetails(employeeId);
      this.fetchEmployees();
      this.selectedAttributeIdToInsert = null;
    },
    error: (err) => {
      console.error('Error adding attribute:', err);
    }
  });
}
}

