import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginErrorMessage = "";

  hide = true;
  user: Observable<firebase.User>;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('')

  loginForm: FormGroup = this.builder.group({
    email: this.email,
    password: this.password
  });

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  constructor(private router: Router, public af: AngularFireAuth, private builder: FormBuilder) {
    this.af.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = af.authState;
        }
      }
    )
  }

  ngOnInit() {
  }

  loginGoogle() {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.loginErrorMessage = "";
    //Redireciona para home
    this.af.auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        this.router.navigate(['/home']);
        console.log(firebaseUser)
      } else {
        console.log('not logged in')
      }
    });
  }

  login() {
    const promise = this.af.auth.signInWithEmailAndPassword(this.loginForm.get('email').value, this.loginForm.get('password').value);
    this.loginErrorMessage = "";
    promise.catch(e => this.loginErrorMessage = e.message);
    //Redireciona para home
    this.af.auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        this.router.navigate(['/home']);
        console.log(firebaseUser)
      } else {
        console.log('not logged in')
      }
    });
  }

  logout() {
    this.af.auth.signOut();
  }

  createUser() {
    const promise = this.af.auth.createUserWithEmailAndPassword(this.loginForm.get('email').value, this.loginForm.get('password').value);
    this.loginErrorMessage = "";
    promise.catch(e => this.loginErrorMessage = e.message);
    //Redireciona para home
    this.af.auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        this.router.navigate(['/home']);
        console.log(firebaseUser)
      } else {
        console.log('not logged in')
      }
    });
  }

}
