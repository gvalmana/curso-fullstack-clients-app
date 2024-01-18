import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'paginator-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {
  @Input() paginator: any
  pages: number[] = [];
  constructor() {

  }

  ngOnInit(): void {
    this.pages = new Array(this.paginator.totalPages).fill(0).map((valor, index) => index + 1);
  }
}
