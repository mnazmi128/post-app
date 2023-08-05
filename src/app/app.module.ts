import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';

//modules
import { AppRoutingModule } from './app-routing.module';

//components
import { AppComponent } from './app.component';
import { PostsListsComponent } from './posts-lists/component/posts-lists.component';
import { PostComponent } from './posts-lists/component/post/post.component';
import { PostDetailComponent } from './post-detail/component/post-detail.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { CommentComponent } from './post-detail/component/comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsListsComponent,
    PostComponent,
    PostDetailComponent,
    LoadingSpinnerComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
