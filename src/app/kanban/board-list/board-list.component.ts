import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { BoardDialogComponent } from '../board-dialog/board-dialog.component';
import { BoardService } from '../board.service';
import { BoardComponent } from '../board/board.component';

@Component({
  selector: 'app-board-list',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    BoardComponent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
})
export class BoardListComponent {
  private readonly _boardService = inject(BoardService);
  private readonly _dialog = inject(MatDialog);

  boards = this._boardService.getUserBoards();

  drop(event: CdkDragDrop<string[]>) {
    if (!this.boards) return;

    const boards = this.boards();
    moveItemInArray(boards, event.previousIndex, event.currentIndex);
    this._boardService.sortBoards(boards);
  }

  openBoardDialog(): void {
    const dialogRef = this._dialog.open(BoardDialogComponent, {
      width: '400px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._boardService.createBoard({
          title: result.title,
          priority: this.boards?.length || 1,
        });
      }
    });
  }
}
