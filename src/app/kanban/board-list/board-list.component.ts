import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { Board } from '../board.model';
import { BoardService } from '../board.service';
import { BoardComponent } from '../board/board.component';
import { MatIconModule } from '@angular/material/icon';
import { BoardDialogComponent } from '../board-dialog/board-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

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

  boards: Board[] | undefined;
  sub: Subscription | undefined;

  ngOnInit() {
    this.sub = this._boardService
      .getUserBoards()
      .subscribe((boards) => (this.boards = boards));
  }

  drop(event: CdkDragDrop<string[]>) {
    if (!this.boards) return;

    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    this._boardService.sortBoards(this.boards);
  }

  openBoardDialog(): void {
    const dialogRef = this._dialog.open(BoardDialogComponent, {
      width: '400px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._boardService.createBoard({
          title: result,
          priority: this.boards?.length || 1,
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub!.unsubscribe();
  }
}
