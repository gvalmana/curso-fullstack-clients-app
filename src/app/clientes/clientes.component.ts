import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { CommonModule } from '@angular/common';
import { ClientesService } from './clientes.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { tap } from 'rxjs';
import { PaginatorComponent } from '../paginator/paginator.component';
import { DetallesComponent } from './detalles/detalles.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink, PaginatorComponent, DetallesComponent],
  templateUrl: './clientes.component.html',
})
export class ClientesComponent {
  constructor(
    private _clientesService: ClientesService,
    private activatedRoute: ActivatedRoute

  ) {}

  clientes: Cliente[] = [];
  paginator: any;
  selectedClient: Cliente | undefined;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: number | null | undefined = 0;
      page = +params.get('page')!;
      this._clientesService
        .getClientes(page)
        .pipe(
          tap((response: any) => {
            (response.content as Cliente[]).forEach(cliente => {
              console.log(cliente.name)
            });
          })
        ).subscribe((response) => {
          this.clientes = response.content as Cliente[]
          this.paginator = response
        });
    });
  }

  delete(cliente: Cliente): void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Seguro que desea eliminar?',
        text: `Esta seguro que desea eliminar el cliente ${cliente.name}!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this._clientesService
            .deleteClient(cliente.id)
            .subscribe((response) => {
              (this.clientes = this.clientes.filter((cli) => cli !== cliente)),
                swal.fire({
                  title: 'Deleted!',
                  text: `Client ${cliente.name} has been deleted.`,
                  icon: 'success',
                });
            });
        }
      });
  }

  showModal(cliente: Cliente): void {
    this.selectedClient = cliente;
  }
}
