import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { Observable } from 'rxjs';
import { AplicacaoService } from "../aplicacao.service";
import { Aplicacao } from "../aplicacao";
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-list-app',
  templateUrl: './list-app.component.html',
  styleUrls: ['./list-app.component.css']
})
export class ListAppComponent implements OnInit {

  displayedColumns: string[] = ['descricao', 'categoria', 'usuarioNome', 'usuarioEmail', 'acao'];
  aplicacoes: Aplicacao[];

  user: Observable<firebase.User>;
  usuario = null;
  usuarioNome;
  usuarioEmail;
  usuarioId;
  usuarioFoto;

  constructor(private builder: FormBuilder, private af: AngularFireAuth, private router: Router, private aplicacaoService: AplicacaoService) {
    this.af.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = af.authState;

          this.usuario = this.af.auth.currentUser;
          if (this.usuario != null) {
            this.usuarioNome = this.usuario.displayName;
            this.usuarioEmail = this.usuario.email;
            this.usuarioId = this.usuario.uid;
            this.usuarioFoto = this.usuario.photoURL;
          }
        }
      }
    )
  }

  descricao = new FormControl('');

  searchForm: FormGroup = this.builder.group({
    descricao: this.descricao
  });

  ngOnInit() {
    this.aplicacaoService.getAplicacoes().subscribe(data => {
      this.aplicacoes = data;
    });
  }

  searchApp() {
    this.aplicacaoService.getAppByName(this.searchForm.get('descricao').value).subscribe(data => {
      this.aplicacoes = data;
    });
  }

  f() {
    if (this.searchForm.get('descricao').value == "") {
      this.aplicacaoService.getAplicacoes().subscribe(data => {
        this.aplicacoes = data;
      });
    }
  }

  listReviews(aplicacao: Aplicacao) {
    localStorage.removeItem('listReviewAplicacaoId');
    localStorage.setItem('listReviewAplicacaoId', aplicacao.id.toString());

    this.router.navigate(['review-app']);
  }

}
