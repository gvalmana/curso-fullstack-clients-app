import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from '../clientes.service';
import { Cliente } from './../cliente';
import { Component } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'detalles-cliente',
  standalone: true,
  imports: [],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.css'
})
export class DetallesComponent {

  client: Cliente = new Cliente();
  title: string = "Detalles del cliente"
  private selectedPicture: File = new File([''], '');
  constructor(private clienteService: ClientesService, private activatedRoute: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id:number = +params.get('id')!;
      if (id) {
        this.clienteService.getCliente(id).subscribe(
          response => {
            this.client = response
          }
        )
      }
    })
  }

  selectPicture(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.selectedPicture = event.target.files[0];
    }
  }
  uploadPicture(): void {
    this.clienteService.uploadPicture(this.selectedPicture, this.client.id).subscribe(
      response => {
        this.client = response;
        this.router.navigate(['/clientes']);
        swal.fire("Picture uploaded", `${this.client.picture} picture uploaded`, 'success');
      }
    )
  }
}
