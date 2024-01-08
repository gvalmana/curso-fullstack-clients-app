import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title: string = 'Bienvenido a Angular';
  curso: string = 'Curso de Spring con Angular';
  profesor: string = 'Andrés';
  autor: string = 'Gustavo Valmaña Villalonga';
}
