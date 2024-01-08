import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clientes.component.html'
})
export class ClientesComponent {

  clientes: Cliente[] = [
    {
      id: 1,
      nombre: "Gustavo",
      apellido: "Valmaña",
      email: "kYrXh@example.com",
      createAt: "2022-10-27"
    },
    {
      id: 2,
      nombre: "Andrés",
      apellido: "Valmaña",
      email: "kYrXh@example.com",
      createAt: "2022-10-27"
    },
    {
      id: 3,
      nombre: "Gustavo",
      apellido: "Valmaña",
      email: "kYrXh@example.com",
      createAt: "2022-10-27"
    },
    {
      id: 4,
      nombre: "Gustavo",
      apellido: "Valmaña",
      email: "kYrXh@example.com",
      createAt: "2022-10-27"
    },
    {
      id: 5,
      nombre: "Gustavo",
      apellido: "Valmaña",
      email: "kYrXh@example.com",
      createAt: "2022-10-27"
    },
    {
      id: 6,
      nombre: "Gustavo",
      apellido: "Valmaña",
      email: "kYrXh@example.com",
      createAt: "2022-10-27"
    }
  ]
}
