import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PasswordInputComponent } from 'components';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-password-demo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    PasswordInputComponent,
  ],
  templateUrl: './password-demo.component.html',
  styleUrls: ['./password-demo.component.scss'],
})
export class PasswordDemoComponent {
  visible = signal(false);

  form: FormGroup = new FormGroup({
    password: new FormControl('', [
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.required,
    ]),
  });

  visibilityClicked() {
    this.visible.update((x) => !x);
  }
}
