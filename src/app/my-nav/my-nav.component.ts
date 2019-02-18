import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.css'],
})
export class MyNavComponent {

  login: boolean = false;
  user: Observable<firebase.User>;

  usuario = null;
  usuarioName;
  usuarioEmail;
  usuarioPhotoUrl;
  usuarioUid;
  usuarioEmailVerified;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, public af: AngularFireAuth) {
    this.af.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = af.authState;
          this.login = true;

          this.usuario = this.af.auth.currentUser;
          if (this.usuario != null) {
            this.usuarioName = this.usuario.displayName;
            this.usuarioEmail = this.usuario.email;
            this.usuarioPhotoUrl = this.usuario.photoURL;
            this.usuarioEmailVerified = this.usuario.emailVerified;
            this.usuarioUid = this.usuario.uid;
            localStorage.removeItem('usuarioId');
            localStorage.setItem('usuarioId', this.usuario.uid.toString());
          }
        }
      }
    )
  }

  logout() {
    this.af.auth.signOut();
    window.location.reload();
  }

}
