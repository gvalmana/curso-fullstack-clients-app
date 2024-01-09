import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { CommonModule } from '@angular/common';
import { ClientesService } from './clientes.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clientes.component.html'
})

export class ClientesComponent {

  constructor(private _clientesService: ClientesService) { }

  clientes: Cliente[] = [];

  ngOnInit(): void {
    this._clientesService.getClientes().subscribe( clientes => this.clientes = clientes );
  }
}
