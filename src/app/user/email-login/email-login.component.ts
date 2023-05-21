import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

type FormType = 'login' | 'signup' | 'reset';

@Component({
  selector: 'app-email-login',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss'],
})
export class EmailLoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly _auth = inject(Auth);

  form: FormGroup | undefined;

  type: FormType = 'signup';
  loading = false;

  serverMessage: string | undefined;

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]],
      passwordConfirm: ['', []],
    });
  }

  changeType(val: FormType) {
    this.type = val;
  }

  get isLogin() {
    return this.type === 'login';
  }

  get isSignup() {
    return this.type === 'signup';
  }

  get isPasswordReset() {
    return this.type === 'reset';
  }

  get email() {
    return this.form?.get('email');
  }
  get password() {
    return this.form?.get('password');
  }

  get passwordConfirm() {
    return this.form?.get('passwordConfirm');
  }

  get passwordDoesMatch() {
    if (this.type !== 'signup') {
      return true;
    } else if (this.password && this.passwordConfirm) {
      return this.password.value === this.passwordConfirm.value;
    }
    return false;
  }

  async onSubmit() {
    this.loading = true;

    if (!this.email || !this.password) return;

    const email = this.email.value;
    const password = this.password.value;

    try {
      if (this.isLogin) {
        await signInWithEmailAndPassword(this._auth, email, password);
      }
      if (this.isSignup) {
        await createUserWithEmailAndPassword(this._auth, email, password);
      }
      if (this.isPasswordReset) {
        await sendPasswordResetEmail(this._auth, email);
        this.serverMessage = 'Check your email';
      }
    } catch (err) {
      this.serverMessage = err as string;
    }

    this.loading = false;
  }
}
