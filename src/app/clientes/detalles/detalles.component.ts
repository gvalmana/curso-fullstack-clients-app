import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from '../clientes.service';
import { Cliente } from './../cliente';
import { Component, Input } from '@angular/core';
import swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'detalles-cliente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.css'
})
export class DetallesComponent {

  @Input() client: Cliente | undefined;
  title: string = "Detalles del cliente"
  selectedPicture: null | File = null;
  progress: number = 0;
  constructor(private clienteService: ClientesService, private activatedRoute: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {}

  selectPicture(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.selectedPicture = event.target.files[0];
      this.progress = 0;
      if (this.selectedPicture &&this.selectedPicture.type.indexOf('image') < 0) {
        swal.fire("Error Upload: ", "Only image files allowed", 'error');
      }
    }
  }
  uploadPicture(): void {
    console.log(this.selectedPicture)
    if (!this.selectedPicture) {
      swal.fire("Error Upload: ", "Please select a picture", 'error');
    } else {
      if (this.client) {
        this.clienteService.uploadPicture(this.selectedPicture, this.client.id).subscribe(
          event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((event.loaded / event.total!) * 100);
            } else if (event instanceof HttpResponse) {
              let response: any = event.body;
              this.client = response.cliente as Cliente;
              swal.fire("Picture uploaded", response.message, 'success');
            }
          }
        )
      }
    }
  }
}
