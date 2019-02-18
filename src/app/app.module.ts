import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AppRoutingModule } from './app-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material';

//Components
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AddAppComponent } from './add-app/add-app.component';
import { EditAppComponent } from './edit-app/edit-app.component';
import { ListAppComponent } from './list-app/list-app.component';
import { LoginComponent } from './login/login.component';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth'; 
import { environment } from '../environments/environment';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ListAppUserComponent } from './list-app-user/list-app-user.component';
import { ReviewAppComponent } from './review-app/review-app.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { ReviewsUserComponent } from './reviews-user/reviews-user.component';

@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    HomeComponent,
    AboutComponent,
    AddAppComponent,
    EditAppComponent,
    ListAppComponent,
    LoginComponent,
    UpdateUserComponent,
    ListAppUserComponent,
    ReviewAppComponent,
    AddReviewComponent,
    ReviewsUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase, 'angularappreview'),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
