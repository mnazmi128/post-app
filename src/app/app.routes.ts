import { Routes } from "@angular/router";
import { PostsListsComponent } from "./posts-lists/component/posts-lists.component";
import { PostDetailComponent } from "./post-detail/component/post-detail.component";

export const appRoutes: Routes = [
  { path: 'posts', component: PostsListsComponent },
  {path: 'posts/:id', component: PostDetailComponent },
  { path: '**', redirectTo: '/posts' }
]
