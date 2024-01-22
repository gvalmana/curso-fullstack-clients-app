import { FormComponent } from './clientes/form.component';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { DetallesComponent } from './clientes/detalles/detalles.component';

export const routes: Routes = [

  {
    path: 'clientes',
    title: 'Listado de clientes',
    component: ClientesComponent,
  },
  {
    path: 'clientes/page/:page',
    title: 'Listado de clientes',
    component: ClientesComponent,
  },
  {
    path: 'clientes/form',
    title: 'Crear cliente',
    component: FormComponent
  },
  {
    path: 'clientes/form/:id',
    title: 'Crear cliente',
    component: FormComponent
  },
];
