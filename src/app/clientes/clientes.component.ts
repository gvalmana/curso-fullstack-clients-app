import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { CommonModule } from '@angular/common';
import { ClientesService } from './clientes.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  templateUrl: './clientes.component.html'
})

export class ClientesComponent {

  constructor(private _clientesService: ClientesService) { }

  clientes: Cliente[] = [];

  ngOnInit(): void {
    this._clientesService.getClientes().subscribe( clientes => this.clientes = clientes );
  }

  delete(cliente: Cliente): void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Seguro que desea eliminar?",
      text: `Esta seguro que desea eliminar el cliente ${cliente.name}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this._clientesService.deleteClient(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente),
            swal.fire({
              title: "Deleted!",
              text: `Client ${cliente.name} has been deleted.`,
              icon: "success"
            });
          }
        )
      }
    });
  }
}
