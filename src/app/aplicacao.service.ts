import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Aplicacao } from './aplicacao';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AplicacaoService {

  // private url = 'http://localhost:3000/aplicacoes';
  private url = '/api/v1/aplicacao/';

  constructor(private http: HttpClient) { }

  getAplicacoes() {
    return this.http.get<Aplicacao[]>(this.url);
  }

  getAplicacoesByUser(id: string) {
    return this.http.get<Aplicacao[]>(this.url + '?usuarioId=' + id);
  }

  getAppByName(descricao: string) {
    return this.http.get<Aplicacao[]>(this.url + '?descricao=' + descricao);
  }

  getAplicacaoById(id: number) {
    return this.http.get<Aplicacao>(this.url + '/' + id);
  }

  createAplicacao(aplicacao: Aplicacao) {
    return this.http.post(this.url, aplicacao);
  }

  updateAplicacao(aplicacao: Aplicacao) {
    return this.http.put(this.url + '/' + aplicacao.id, aplicacao);
  }

  deleteAplicacao(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
