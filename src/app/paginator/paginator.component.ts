import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'paginator-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() paginator: any;
  pages: number[] = [];
  from: number = 0;
  to: number = 0;
  constructor() {}

  ngOnInit(): void {
    this.initPages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let paginadorActualizado = changes['paginator']
    if (paginadorActualizado.previousValue) {
      this.initPages();
    }
  }

  private initPages(): void {
    this.from = Math.min(Math.max(1, this.paginator.number - 4), this.paginator.totalPages - 5)
    this.to = Math.max(Math.max(this.paginator.totalPages, this.paginator.number + 4), 6)
    if (this.paginator.totalPages > 5) {
      this.pages = new Array(this.to - this.from + 1)
        .fill(0)
        .map((_valor, index) => index + this.from);
    } else {
      this.pages = new Array(this.paginator.totalPages)
        .fill(0)
        .map((_valor, index) => index + 1);
    }
  }
}
