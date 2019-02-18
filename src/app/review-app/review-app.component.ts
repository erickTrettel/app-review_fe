import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { ReviewService } from '../review.service';
import { Review } from '../review';
import { AplicacaoService } from '../aplicacao.service';
import { Aplicacao } from '../aplicacao';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-review-app',
  templateUrl: './review-app.component.html',
  styleUrls: ['./review-app.component.css']
})
export class ReviewAppComponent implements OnInit {

  aplicacao: Aplicacao;
  reviews: Review[];

  usuarioId;
  user: Observable<firebase.User>;
  usuario = null;

  constructor(public af: AngularFireAuth, private router: Router, private reviewService: ReviewService, private aplicacaoService: AplicacaoService) {
    this.af.authState.subscribe((auth) => {
      if (auth != null) {
        this.user = af.authState;

        this.usuario = this.af.auth.currentUser;
        if (this.usuario != null) {
          this.usuarioId = this.usuario.uid;
        }
      }
    });
  }

  ngOnInit() {
    let aplicacaoId = localStorage.getItem('listReviewAplicacaoId');
    if (!aplicacaoId) {
      alert("Ação inválida")
      this.router.navigate(['home']);
      return;
    }

    this.aplicacaoService.getAplicacaoById(+aplicacaoId).subscribe(data => {
      this.aplicacao = data;
    });

    this.getReviewsByAppId(+aplicacaoId);
  }

  getReviewsByAppId(id: number) {
    this.reviewService.getReviewByAppId(id).subscribe(data => {
      this.reviews = data;
    });
  }

  addReview() {
    localStorage.removeItem('addReviewAppId');
    localStorage.setItem('addReviewAppId', this.aplicacao.id.toString());

    localStorage.removeItem('addReviewAppDescricao');
    localStorage.setItem('addReviewAppDescricao', this.aplicacao.descricao);

    this.router.navigate(['add-review']);
  }

  deletarReview(review: Review) {
    this.reviewService.deleteReview(review.id).subscribe(data => {
      this.reviews = this.reviews.filter(r => r !== review);
    });
  }

}
