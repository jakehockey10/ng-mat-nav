import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

import { DeleteButtonComponent } from 'components';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BoardService } from '../board.service';

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
