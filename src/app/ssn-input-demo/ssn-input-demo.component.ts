import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  SocialSecurityNumber,
  SsnInputComponent,
} from '../ssn-input/ssn-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ssn-input-demo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    SsnInputComponent,
  ],
  templateUrl: './ssn-input-demo.component.html',
  styleUrls: ['./ssn-input-demo.component.scss'],
})
export class SsnInputDemoComponent {
  form: FormGroup = new FormGroup({
    ssn: new FormControl(new SocialSecurityNumber('', '', '')),
  });
}
