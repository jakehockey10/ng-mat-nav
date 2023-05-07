import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationModule, ConfirmationService } from 'components';

@Component({
  selector: 'app-confirmation-example',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, ConfirmationModule],
  templateUrl: './confirmation-example.component.html',
  styleUrls: ['./confirmation-example.component.scss'],
  providers: [MatSnackBar],
})
export class ConfirmationExampleComponent {
  private readonly confirmation = inject(ConfirmationService);
  private readonly snackBar = inject(MatSnackBar);

  response = signal<boolean | undefined>(undefined);

  buttonColor = computed(() => {
    switch (this.response()) {
      case true:
        return 'primary';
      case false:
        return 'accent';
      default:
        return this.response();
    }
  });

  constructor() {
    effect(() => {
      if (this.response() !== undefined) {
        this.snackBar.open(`You chose ${this.response()}`, undefined, {
          duration: 3000,
        });
      }
    });
  }

  async confirm() {
    const response = await this.confirmation.confirm({
      title: 'Really?',
      message: 'But really though??',
      disableClose: true,
    });
    this.response.set(response);
  }
}
