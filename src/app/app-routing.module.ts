import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AddAppComponent} from './add-app/add-app.component';
import { EditAppComponent } from './edit-app/edit-app.component';
import { ListAppComponent } from './list-app/list-app.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ListAppUserComponent } from './list-app-user/list-app-user.component';
import { ReviewAppComponent } from './review-app/review-app.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { ReviewsUserComponent } from './reviews-user/reviews-user.component';

const routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'sobre', component: AboutComponent },
  { path: 'cad-app', component: AddAppComponent },
  { path: 'edit-app', component: EditAppComponent},
  { path: 'list-app-user', component: ListAppUserComponent },
  { path: 'update-user', component: UpdateUserComponent },
  { path: 'review-app', component: ReviewAppComponent },
  { path: 'add-review', component: AddReviewComponent },
  { path: 'reviews-user', component: ReviewsUserComponent }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
