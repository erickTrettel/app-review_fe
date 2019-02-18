import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { AplicacaoService } from "../aplicacao.service";
import { Aplicacao } from "../aplicacao";
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-list-user-app',
  templateUrl: './list-app-user.component.html',
  styleUrls: ['./list-app-user.component.css']
})
export class ListAppUserComponent implements OnInit {

  displayedColumns: string[] = ['descricao', 'categoria', 'usuarioNome', 'usuarioEmail', 'acao'];
  aplicacoes: Aplicacao[];

  user: Observable<firebase.User>;
  usuario = null;
  usuarioNome;
  usuarioEmail;
  usuarioId;

  constructor(private af: AngularFireAuth, private router: Router, private aplicacaoService: AplicacaoService) {
    this.af.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = af.authState;

          this.usuario = this.af.auth.currentUser;
          if (this.usuario != null) {
            this.usuarioNome = this.usuario.displayName;
            this.usuarioEmail = this.usuario.email;
            this.usuarioId = this.usuario.uid;
          }
        }
      }
    )
  }

  ngOnInit() {
    this.getAppUser();
  }

  getAppUser() {
    let uid = localStorage.getItem('usuarioId');
    this.aplicacaoService.getAplicacoesByUser(uid).subscribe(data => {
      this.aplicacoes = data;
    });
  }

  deleteAplicacao(aplicacao: Aplicacao) {
    this.aplicacaoService.deleteAplicacao(aplicacao.id).subscribe(data => {
      this.aplicacoes = this.aplicacoes.filter(a => a !== aplicacao);
    });
  }

  editAplicacao(aplicacao: Aplicacao) {
    localStorage.removeItem('editAplicacaoId');
    localStorage.setItem('editAplicacaoId', aplicacao.id.toString());
    this.router.navigate(['edit-app']);
  }

}
