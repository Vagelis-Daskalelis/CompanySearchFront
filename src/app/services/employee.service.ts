import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee, EmployeeUpdateDTO} from '../models/employee';
import { Attribute } from '../models/attribute';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:8089/api';

  constructor(private http: HttpClient) { }

    getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl + '/employees');
  }

createEmployee(employee: Omit<Employee, 'id'>): Observable<Employee> {
  return this.http.post<Employee>(this.apiUrl + '/employees', employee);
}


  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/employees/delete/${id}`);
  }


  updateEmployee(dto: EmployeeUpdateDTO): Observable<Employee> {
  return this.http.put<Employee>(this.apiUrl + '/employees/update', dto);
}


getEmployeeById(id: number): Observable<Employee> {
  return this.http.get<Employee>(`${this.apiUrl}/employees/${id}`);
}


addAttributeToEmployee(employeeId: number, attributeId: number): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/employee-attributes/update/${employeeId}/${attributeId}`, {});
}


// In your EmployeeService (or a relevant service)

getAttributesByEmployee(employeeId: number): Observable<Attribute[]> {
  return this.http.get<Attribute[]>(`${this.apiUrl}/employees-attributes/${employeeId}`);
}
}
