import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Aplicacao } from '../aplicacao';
import { AplicacaoService } from '../aplicacao.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { ReviewService } from '../review.service';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  user: Observable<firebase.User>;
  usuario = null;

  usuarioNome: string;
  usuarioId: string;
  usuarioEmail: string;
  usuarioFoto: string;
  
  aplicacaoId: string;
  aplicacao: Aplicacao;
  addForm: FormGroup;

  constructor(public af: AngularFireAuth, private router: Router, private aplicacaoService: AplicacaoService, private formBuilder: FormBuilder, private reviewService: ReviewService) { 
    this.af.authState.subscribe( auth => {
      if (auth != null) {
        this.user = af.authState;

        this.usuario = this.af.auth.currentUser;
        if (this.usuario != null) {
          this.usuarioNome = this.usuario.displayName;
          this.usuarioEmail = this.usuario.email;
          this.usuarioFoto = this.usuario.photoURL;
          this.usuarioId = this.usuario.uid;
        }
      }
    });
  }

  ngOnInit() {
    let aplicacaoId = localStorage.getItem('addReviewAppId');
    let aplicacaoDescricao = localStorage.getItem('addReviewAppDescricao');

    if (!aplicacaoId) {
      alert("Ação inválida")
      this.router.navigate(['home']);
      return;
    }

    this.aplicacaoId = aplicacaoId;
    this.aplicacaoService.getAplicacaoById(+this.aplicacaoId).subscribe(data => {
      this.aplicacao = data;
    });

    this.addForm = new FormGroup({
      id: new FormControl(),
      review: new FormControl(),
      nota: new FormControl(),
      idAplicacao: new FormControl(aplicacaoId),
      descricaoAplicacao: new FormControl(aplicacaoDescricao),
      usuarioId: new FormControl(this.usuarioId),
      usuarioNome: new FormControl(this.usuarioNome),
      usuarioEmail: new FormControl(this.usuarioEmail),
      usuarioFoto: new FormControl(this.usuarioFoto)
    });
  }

  addReview() {
    this.reviewService.createReview(this.addForm.value).subscribe(data => {
      this.router.navigate(['home']);
    });
  }
}
