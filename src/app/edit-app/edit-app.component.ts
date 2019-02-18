import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AplicacaoService } from "../aplicacao.service";
import { Observable } from "rxjs";
import { first } from "rxjs/operators";
import { Router } from "@angular/router";

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Aplicacao } from '../aplicacao';

export interface Categoria {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-app',
  templateUrl: './edit-app.component.html',
  styleUrls: ['./edit-app.component.css']
})
export class EditAppComponent implements OnInit {

  categorias: Categoria[] = [
    { value: 'Jogos', viewValue: 'Jogos' },
    { value: 'Entretenimento', viewValue: 'Entretenimento' },
    { value: 'Saúde e Beleza', viewValue: 'Saúde e Beleza' },
    { value: 'Negócios', viewValue: 'Negócios' },
    { value: 'Social', viewValue: 'Social' },
    { value: 'Outros', viewValue: 'Outros' }
  ];

  user: Observable<firebase.User>;
  usuario = null;

  constructor(public af: AngularFireAuth, private formBuilder: FormBuilder, private router: Router,
    private aplicacaoService: AplicacaoService) {
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

  editForm: FormGroup;
  usuarioId: string;
  usuarioNome: string;
  usuarioEmail: string;

  aplicacao: Aplicacao;

  ngOnInit() {
    let aplicacaoId = localStorage.getItem("editAplicacaoId");
    if (!aplicacaoId) {
      alert("Ação inválida")
      this.router.navigate(['home']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],
      descricao: ['', Validators.required],
      categoria: ['', Validators.required],
      usuarioId: [this.usuarioId, Validators.required],
      usuarioNome: [this.usuarioNome, Validators.required],
      usuarioEmail: [this.usuarioEmail, Validators.required]
    });
    this.aplicacaoService.getAplicacaoById(+aplicacaoId)
      .subscribe(data => {
        this.editForm.setValue(data);
      });
  }

  editarAplicacao() {
    this.aplicacaoService.updateAplicacao(this.editForm.value)
      .pipe(first())
      .subscribe( data => {
          this.router.navigate(['home']);
        }, error => {
          alert(error);
        }
      );
  }

}
