import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente } from './cliente';
import { CommonModule } from '@angular/common';
import { ClientesService } from './clientes.service';
import { Router } from '@angular/router';

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
  constructor(private ClientesService: ClientesService, private router: Router) { }

  public create(): void {
    this.ClientesService.create(this.cliente).subscribe(
      response => {
        console.log(response)
        this.router.navigate(['/clientes'])
      }
    )
  }
}
