import { NgModule } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationService } from './confirmation.service';

@NgModule({
  imports: [MatDialogModule],
  providers: [MatDialog, ConfirmationService],
})
export class ConfirmationModule {}
