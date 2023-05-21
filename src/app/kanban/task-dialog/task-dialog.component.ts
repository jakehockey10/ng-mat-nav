import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import { DeleteButtonComponent } from 'components';

import { BoardService } from '../board.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatIconModule,
    DeleteButtonComponent,
    MatButtonModule,
  ],
  templateUrl: './task-dialog.component.html',
  styleUrls: ['../dialog.scss'],
})
export class TaskDialogComponent {
  private readonly _dialogRef = inject(MatDialogRef<TaskDialogComponent>);
  private readonly _boardService = inject(BoardService);
  labelOptions = ['purple', 'blue', 'green', 'yellow', 'red', 'gray'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this._dialogRef.close();
  }

  handleTaskDelete() {
    this._boardService.removeTask(this.data.boardId, this.data.task);
    this._dialogRef.close();
  }
}
