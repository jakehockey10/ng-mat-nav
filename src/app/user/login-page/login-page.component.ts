import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth, authState, signOut } from '@angular/fire/auth';
import { EmailLoginComponent } from '../email-login/email-login.component';
import { MatButtonModule } from '@angular/material/button';
import { GoogleSigninDirective } from '../google-signin.directive';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    EmailLoginComponent,
    MatButtonModule,
    GoogleSigninDirective,
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  private readonly _auth = inject(Auth);

  authState = authState(this._auth);

  signOut() {
    signOut(this._auth);
  }
}
