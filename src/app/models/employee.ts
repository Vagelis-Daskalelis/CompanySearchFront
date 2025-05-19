export interface Employee {
    id: number;
    name: string;
    birthday: string;
    hasCar: boolean;
    address: string;
    attributes: any[];
}



export interface EmployeeUpdateDTO {
  id: number;
  name: string;
  birthday: string;
  hasCar: boolean;
  address: string;
}