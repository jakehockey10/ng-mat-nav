import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Board, Task } from '../board.model';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { DeleteButtonComponent } from 'components';

import { BoardService } from '../board.service';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { BoardDialogComponent } from '../board-dialog/board-dialog.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    DragDropModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    DeleteButtonComponent,
  ],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  private readonly _boardService = inject(BoardService);
  private readonly _dialog = inject(MatDialog);

  @Input() board: Board | undefined;

  taskDrop(event: CdkDragDrop<string[]>) {
    if (!this.board || !this.board.tasks || !this.board.id) return;

    moveItemInArray(this.board.tasks, event.previousIndex, event.currentIndex);
    this._boardService.updateTasks(this.board.id, this.board.tasks);
  }

  openEditDialog(): void {
    const dialogRef = this._dialog.open(BoardDialogComponent, {
      width: '400px',
      data: { ...this.board, isNew: false },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._boardService.updateBoard({
          ...this.board,
          title: result.title,
        });
      }
    });
  }

  openTaskDialog(task?: Task, idx?: number): void {
    const newTask = { label: 'purple' };
    const dialogRef = this._dialog.open(TaskDialogComponent, {
      width: '500px',
      data: task
        ? { task: { ...task }, isNew: false, boardId: this.board!.id, idx }
        : { task: newTask, isNew: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.isNew) {
          this._boardService.updateTasks(this.board!.id!, [
            ...this.board!.tasks!,
            result.task,
          ]);
        } else {
          const update = this.board!.tasks!;
          update.splice(result.idx, 1, result.task);
          this._boardService.updateTasks(this.board!.id!, this.board!.tasks!);
        }
      }
    });
  }

  handleDelete() {
    if (!this.board || !this.board.id) return;

    this._boardService.deleteBoard(this.board.id);
  }
}
