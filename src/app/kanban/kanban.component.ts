import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardListComponent } from './board-list/board-list.component';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CommonModule, BoardListComponent],
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss'],
})
export class KanbanComponent {}
