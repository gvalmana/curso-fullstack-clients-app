import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente } from './cliente';
import { CommonModule } from '@angular/common';
import { ClientesService } from './clientes.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear cliente";
  constructor(private ClientesService: ClientesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadCliente();
  }

  public loadCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.ClientesService.getCliente(id).subscribe(
          response => this.cliente = response
        )
      }
    })
  }

  public create(): void {
    this.ClientesService.create(this.cliente).subscribe(
      response => {
        this.cliente = response
        this.router.navigate(['/clientes'])
        swal.fire("Cliente creado", `El cliente ${this.cliente.name} ha sido creado con exito`, 'success')
      }
    )
  }

  public update(): void {
    console.log("Comenzando a actualizar")
    this.ClientesService.updateCliente(this.cliente).subscribe(
      response => {
        console.log(response)
        this.cliente = response
        this.router.navigate(['/clientes'])
        swal.fire("Cliente actualizado", `El cliente ${this.cliente.name} ha sido actualizado con éxito`, 'success')
      }
    )
  }
}
