import { Routes } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';
import { AttributeComponent } from './components/attribute/attribute.component';
import { MapComponent } from './components/map/map.component';
import { AppComponent } from './app.component';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { AttributeCreateComponent } from './components/attribute-create/attribute-create.component';

export const routes: Routes = [
    { path:'employees/list', component:EmployeeComponent },
    { path:'employees/add', component:EmployeeCreateComponent},
    { path:'attributes/list', component:AttributeComponent },
    { path:'attributes/add', component:AttributeCreateComponent },
    { path:'map', component:MapComponent }
];
