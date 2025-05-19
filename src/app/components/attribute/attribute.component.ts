import { Component } from '@angular/core';
import { Attribute, AttributeUpdateDto } from '../../models/attribute';
import { AttributeService } from '../../services/attribute.service';
import { FormsModule, NgModel } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-attribute',
  imports: [FormsModule, NgIf, NgFor, NgClass],
  templateUrl: './attribute.component.html',
  styleUrl: './attribute.component.css'
})
export class AttributeComponent {

 attributes: Attribute[] = [];


//   newAttribute: Omit<Attribute, 'id'> & { id?: number } = {
//   name: '',
//   value: ''
// };

  constructor(private attributeService: AttributeService){}


  isLoading = false;
  error: string | null = null;

  // Get all attributes

  fetchAttributes(): void {
    this.isLoading = true;
    this.error = null;

    this.attributeService.getAttributes().subscribe({
      next: (data) => {
        this.attributes = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
        this.error = 'Failed to load employees';
        this.isLoading = false;
      }
    });
  }


  // Delete attribute

  deleteAttribute(id: number): void {
  this.attributeService.deleteAttribute(id).subscribe({
    next: () => {
      console.log(`Attribute with ID ${id} deleted.`);
      this.fetchAttributes(); // Refresh list
    },
    error: (err) => console.error('Error deleting employee:', err)
  });
}

  // Update Attribute

selectedAttribute: Attribute | null = null;

attributeForm: AttributeUpdateDto = {
  id: 0,
  name: '',
  value: ''
};
updateAttribute(): void {
  if (!this.attributeForm.id) {
    console.error('No attribute selected for update.');
    return;
  }

  this.attributeService.updateAttribute(this.attributeForm).subscribe({
    next: (updated) => {
      console.log('Attribute updated:', updated);
      this.fetchAttributes(); // refresh list
      this.cancelEdit();     // reset form
    },
    error: (err) => {
      console.error('Error updating attribute:', err);
    }
  });
}

cancelEdit(): void {
  this.selectedAttribute = null;
  this.attributeForm = {
    id: 0,
    name: '',
    value: ''
  };
}

editAttribute(atr: Attribute): void {
  this.selectedAttribute = atr;
  this.attributeForm = { ...atr };
}

  // Get one employee

  detailedAttribute: any = null;

viewAttributeDetails(id: number): void {
  this.attributeService.getAttributeById(id).subscribe({
    next: (attribute) => {
      this.detailedAttribute = attribute;
    },
    error: (err) => {
      console.error('Error fetching employee details:', err);
      this.detailedAttribute = null;
    }
  });
}

closeDetails(): void {
  this.detailedAttribute = null;
}





employeesWithAttribute: Employee[] = [];
selectedAttributeValue: string = '';


clearEmployeesWithAttribute(): void {
  this.employeesWithAttribute = [];
  this.selectedAttributeValue = '';
}


selectedAttributeId: number = 0;

getEmployeesByAttribute(value: string): void {
  this.selectedAttributeValue = value;
  this.attributeService.getEmployeesByAttributeValue(value).subscribe({
    next: (employees) => {
      this.employeesWithAttribute = employees;
      if (employees.length > 0 && employees[0].attributes) {
        const matchingAttr = employees[0].attributes.find(attr => attr.value === value);
        if (matchingAttr) {
          this.selectedAttributeId = matchingAttr.id!;
        }
      }
    },
    error: (err) => console.error('Error loading employees by attribute:', err)
  });
}



deleteEmployeeAttribute(employeeId: number, attributeId: number): void {
  this.attributeService.deleteEmployeeAttribute(employeeId, attributeId).subscribe({
    next: () => {
      console.log(`Attribute ${attributeId} removed from employee ${employeeId}`);
      this.getEmployeesByAttribute(this.selectedAttributeValue); // Refresh list
    },
    error: (err) => console.error('Failed to delete attribute from employee:', err)
  });
}



}
