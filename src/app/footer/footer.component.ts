import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  autor: any = { nombre: 'Gustavo', apellidos: 'Valmaña Villalonga' };
  year: number = new Date().getFullYear();
}
