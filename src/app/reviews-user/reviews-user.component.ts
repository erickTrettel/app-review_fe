import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { ReviewService } from '../review.service';
import { Review } from '../review';

@Component({
  selector: 'app-reviews-user',
  templateUrl: './reviews-user.component.html',
  styleUrls: ['./reviews-user.component.css']
})
export class ReviewsUserComponent implements OnInit {

  reviews: Review[];

  constructor(private router: Router, private reviewService: ReviewService) { }

  ngOnInit() {
    let usuarioId = localStorage.getItem('usuarioId');
    this.getReviewsByUserId(usuarioId);
  }

  getReviewsByUserId(usuarioId: string) {
    this.reviewService.getReviewByUserId(usuarioId).subscribe(data => {
      this.reviews = data;
    });
  }

  deletarReview(review: Review) {
    this.reviewService.deleteReview(review.id).subscribe(data => {
      this.reviews = this.reviews.filter(r => r !== review);
    });
  }

}
