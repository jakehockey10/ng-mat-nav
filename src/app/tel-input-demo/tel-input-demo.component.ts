import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TelInputComponent, TelephoneNumber } from 'components';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tel-input-demo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    TelInputComponent,
  ],
  templateUrl: './tel-input-demo.component.html',
  styleUrls: ['./tel-input-demo.component.scss'],
})
export class TelInputDemoComponent {
  form: FormGroup = new FormGroup({
    tel: new FormControl(new TelephoneNumber('', '', '')),
  });
}
