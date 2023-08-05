import { Component, Input, OnInit } from '@angular/core';

//interfaces
import { PostComment } from '../../interfaces/post-comment.interface';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: PostComment;

  constructor() { }

  ngOnInit(): void {
  }

}
