import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './directiva.component.html',
  styleUrl: './directiva.component.css'
})
export class DirectivaComponent {
  listaCurso: string[] = ['TypeScript', 'JavaScript', 'Java SE', 'C#', 'PHP'];
  habilitar: boolean = true;

  setHabilitar():void {
    this.habilitar = (this.habilitar == true) ? false : true;
  }
}
