import { Injectable } from '@angular/core';

import { Review } from './review';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  // private url = "http://localhost:3000/reviews";
  private url = '/api/v1/review/';

  constructor(private http: HttpClient) { }

  getReviews() {
    return this.http.get<Review[]>(this.url);
  }

  getReviewById(id: number) {
    return this.http.get<Review[]>(this.url + '?id=' + id);
  }

  getReviewByAppId(idAplicacao: number) {
    return this.http.get<Review[]>(this.url + '?idAplicacao=' + idAplicacao);
  }

  getReviewByUserId(usuarioId: string) {
    return this.http.get<Review[]>(this.url + '?usuarioId=' + usuarioId);
  }

  createReview(review: Review) {
    return this.http.post(this.url, review);
  }

  updateReview(review: Review) {
    return this.http.put(this.url + '/' + review.id, review);
  }

  deleteReview(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
