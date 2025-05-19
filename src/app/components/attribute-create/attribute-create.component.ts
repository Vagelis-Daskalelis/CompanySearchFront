import { Component } from '@angular/core';
import { Attribute } from '../../models/attribute';
import { AttributeService } from '../../services/attribute.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-attribute-create',
  imports: [FormsModule],
  templateUrl: './attribute-create.component.html',
  styleUrl: './attribute-create.component.css'
})
export class AttributeCreateComponent {
  
newAttribute: Omit<Attribute, 'id'> & { id?: number} = {
  name: '',
  value: ''
};


  constructor(private attributeService: AttributeService){}

addAttribute(): void {
  this.attributeService.createAttribute(this.newAttribute).subscribe({
    next: (attr) => {
      console.log('Attribute created:', attr);
      // Reset form fields
      this.newAttribute = { name: '', value: '' };
    },
    error: (err) => console.error('Error creating attribute:', err)
  });
}
}
