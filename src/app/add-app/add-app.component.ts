import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AplicacaoService } from "../aplicacao.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

export interface Categoria {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-app',
  templateUrl: './add-app.component.html',
  styleUrls: ['./add-app.component.css']
})
export class AddAppComponent implements OnInit {

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
  addForm: FormGroup;
  usuarioId: string;
  usuarioNome: string;
  usuarioEmail: string;

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

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      descricao: ['', Validators.required],
      categoria: ['', Validators.required],
      usuarioId: [this.usuarioId, Validators.required],
      usuarioNome: [this.usuarioNome, Validators.required],
      usuarioEmail: [this.usuarioEmail, Validators.required]
    });
  }

  addAplicacao() {
    this.aplicacaoService.createAplicacao(this.addForm.value).subscribe(data => {
      this.router.navigate(['home']);
    });
  }

}
