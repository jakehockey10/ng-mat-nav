import { Injectable, inject } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, first, map, take } from 'rxjs/operators';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { ConfirmationDialogModel } from './confirmation-dialog.model';
import { lastValueFrom } from 'rxjs';

type ConfirmationDialogOptions = Omit<
  MatDialogConfig<ConfirmationDialogModel>,
  'data'
>;

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  private readonly dialog = inject(MatDialog);

  confirm(
    options: ConfirmationDialogOptions & {
      title?: string;
      message?: string;
    } = {}
  ): Promise<boolean> {
    const dialogRef: MatDialogRef<ConfirmationDialogComponent, boolean> =
      this.dialog.open(ConfirmationDialogComponent, {
        ...options,
        data: new ConfirmationDialogModel(
          options.title ?? 'Confirm Action',
          options.message ?? 'Are you sure you want to do this?'
        ),
      });

    return lastValueFrom(
      dialogRef.afterClosed().pipe(
        map((x) => !!x),
        first()
      )
    );
  }
}
