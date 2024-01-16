import { FormComponent } from './clientes/form.component';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { DirectivaComponent } from './directiva/directiva.component';

export const routes: Routes = [

  {
    path: 'clientes',
    title: 'Listado de clientes',
    component: ClientesComponent,
  },
  {
    path: 'clientes/form',
    title: 'Crear cliente',
    component: FormComponent
  },
];
