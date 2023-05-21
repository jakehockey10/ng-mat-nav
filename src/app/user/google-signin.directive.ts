import { Directive, HostListener, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

@Directive({
  selector: '[appGoogleSignin]',
  standalone: true,
})
export class GoogleSigninDirective {
  private readonly _auth = inject(Auth);

  @HostListener('click')
  onClick() {
    signInWithPopup(this._auth, new GoogleAuthProvider());
  }
}
