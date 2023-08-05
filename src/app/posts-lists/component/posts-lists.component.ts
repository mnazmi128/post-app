import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

//interfaces
import { Post } from '../interfaces/post.interface';

//services
import { PostsService } from 'src/app/shared/services/posts/posts.service';


@Component({
  selector: 'app-posts-lists',
  templateUrl: './posts-lists.component.html',
  styleUrls: ['./posts-lists.component.css']
})
export class PostsListsComponent implements OnInit, OnDestroy {
  postList: Array<Post>;
  isLoading = false;

  private readonly $destroy = new Subject<void>();

  constructor(
    private postsService: PostsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getAllPosts()
      .pipe(takeUntil(this.$destroy))
      .subscribe((response: Array<Post>) => {
        this.isLoading = false;
        this.postList = response;
      })
  }

  goToPost(postId: number): void {
    this.router.navigate(['posts', postId]);
  }

  ngOnDestroy(): void {
      this.$destroy.next();
      this.$destroy.complete();
  }

}
