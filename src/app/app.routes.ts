import { Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { DirectivaComponent } from './directiva/directiva.component';

export const routes: Routes = [
  { path: '', component: ClientesComponent },
  { path: 'directivas', component: DirectivaComponent },
];
