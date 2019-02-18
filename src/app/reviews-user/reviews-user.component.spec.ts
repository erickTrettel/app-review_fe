import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsUserComponent } from './reviews-user.component';

describe('ReviewsUserComponent', () => {
  let component: ReviewsUserComponent;
  let fixture: ComponentFixture<ReviewsUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewsUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
