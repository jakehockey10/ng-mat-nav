import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { DeleteButtonComponent } from 'components';

@Component({
  selector: 'app-board-dialog',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    DeleteButtonComponent,
  ],
  templateUrl: './board-dialog.component.html',
  styleUrls: ['../dialog.scss'],
})
export class BoardDialogComponent {
  private readonly _dialogRef = inject(MatDialogRef<BoardDialogComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this._dialogRef.close();
  }
}
