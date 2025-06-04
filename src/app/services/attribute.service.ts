import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Attribute, AttributeUpdateDto } from '../models/attribute';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  private apiUrl = 'http://localhost:8089/api';

  constructor(private http: HttpClient) { }



 // Get all attributes
  getAttributes(): Observable<Attribute[]> {
    return this.http.get<Attribute[]>(`${this.apiUrl}/attributes`);
  }

  // Get attribute by id
  getAttributeById(id: number): Observable<Attribute> {
    return this.http.get<Attribute>(`${this.apiUrl}/attributes/${id}`);
  }

  // Create a new attribute
  createAttribute(attribute: Omit<Attribute, 'id'>): Observable<Attribute> {
    return this.http.post<Attribute>(`${this.apiUrl}/attributes`, attribute);
  }

  // Update attribute
  updateAttribute(attribute: AttributeUpdateDto): Observable<Attribute> {
    return this.http.put<Attribute>(`${this.apiUrl}/attributes/update`, attribute);
  }

  // Delete attribute by id
  deleteAttribute(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/attributes/delete/${id}`);
  }

  // get employees that have the attribute value
  getEmployeesByAttributeValue(value: string): Observable<Employee[]> {
  return this.http.get<Employee[]>(`${this.apiUrl}/employee-attributes/${value}`);
}

// removes the attribute from the employee
deleteEmployeeAttribute(employeeId: number, attributeId: number): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/employee-attributes/delete/${employeeId}/${attributeId}`, {});
}
}
