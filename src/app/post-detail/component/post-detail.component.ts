import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, forkJoin, map, switchMap, takeUntil } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

//interfaces
import { Post } from 'src/app/posts-lists/interfaces/post.interface';
import { PostComment } from '../interfaces/post-comment.interface';

//services
import { PostsService } from 'src/app/shared/services/posts/posts.service';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {
  post: Post;
  comments: Array<PostComment>;
  commentsToDisplay: Array<PostComment>;
  searchForm: FormGroup;
  isLoading = false;

  public readonly searchOptions = [
    {
      name: "Email",
      value: "email",
    },
    {
      name: "Name",
      value: "name",
    },
    {
      name: "Content",
      value: "body",
    }
  ]

  private readonly $destroy = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getComments(1).subscribe((response) => {
      console.log(response);
    })
    this.route.params
      .pipe(
        switchMap((param: Params) => {
          return forkJoin({
            postDetail: this.postsService.getPost(param['id']),
            comments: this.postsService.getComments(param['id'])
          })
        }),
        takeUntil(this.$destroy),
      ).subscribe((response) => {
        this.isLoading = false;
        this.post = response.postDetail;
        this.comments = response.comments;
        this.commentsToDisplay = response.comments;
      })
    this.searchForm = this.formBuilder.group({
      searchOption: new FormControl(this.searchOptions[0].value),
      searchValue: new FormControl(""),
    });
  }

  search(formValue: {searchOption: string, searchValue: string}): void {
    let option = formValue.searchOption as keyof PostComment;
    this.commentsToDisplay = this.comments.filter((comment) => {
      return comment[option].toString().toLowerCase().includes(formValue.searchValue.toLowerCase());
    })
  }

  clearSearch(): void {
    this.commentsToDisplay = this.comments;
  }

  ngOnDestroy(): void {
      this.$destroy.next();
      this.$destroy.complete();
  }

}
