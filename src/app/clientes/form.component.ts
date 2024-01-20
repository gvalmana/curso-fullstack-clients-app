import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente } from './cliente';
import { CommonModule } from '@angular/common';
import { ClientesService } from './clientes.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule, MatDatepickerModule, MatMomentDateModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear cliente";
  public errors: string[] = [];

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
        this.router.navigate(['/clientes'])
        swal.fire("Cliente creado", `El cliente ${response.name} registrado con éxito`, 'success')
      },
      err => {
        this.errors = err.error.errors as string[]
        console.error(`Codigo desde el backend ${err.status}`)
        console.error(err.error.errors)
      }
    )
  }

  public update(): void {
    this.ClientesService.updateCliente(this.cliente).subscribe(
      response => {
        this.cliente = response
        this.router.navigate(['/clientes'])
        swal.fire("Cliente creado", `${response.message}: ${response.data.name}`, 'success')
      },
      err => {
        this.errors = err.error.errors as string[]
        console.error(`Codigo desde el backend ${err.status}`)
        console.error(err.error.errors)
      }
    )
  }
}
