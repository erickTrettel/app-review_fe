import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  user: Observable<firebase.User>;

  usuario = null;
  usuarioName;
  usuarioEmail;
  usuarioPhotoUrl;
  usuarioUid;
  usuarioEmailVerified;

  errorMessage = "";

  nome = new FormControl('');

  updateUserForm: FormGroup = this.builder.group({
    nome: this.nome
  });

  constructor(public af: AngularFireAuth, private builder: FormBuilder, private router: Router) {
    this.af.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = af.authState;

          this.usuario = this.af.auth.currentUser;
          if (this.usuario != null) {
            this.usuarioName = this.usuario.displayName;
            this.usuarioEmail = this.usuario.email;
            this.usuarioPhotoUrl = this.usuario.photoURL;
            this.usuarioEmailVerified = this.usuario.emailVerified;
            this.usuarioUid = this.usuario.uid;
          }
        }
      }
    )
  }

  ngOnInit() {
  }

  updateUser() {
    var user = this.usuario;

    user.updateProfile({
      displayName: this.updateUserForm.get('nome').value
    }).then(function () {
      // Update successful.
      //Atualizar nome de usuario em aplicacao, comentario e review
      
      this.errorMessage = "";
      this.router.navigate(['home']);
    }).catch(function (error) {
      // An error happened.
      this.errorMessage = error.message;
    });
  }

}
