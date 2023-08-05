import { Injectable } from '@angular/core';
import { NetworkService } from '../network/network.service';
import { Observable } from 'rxjs';
import { Post } from 'src/app/posts-lists/interfaces/post.interface';
import { PostComment } from 'src/app/post-detail/interfaces/post-comment.interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private networkServicea: NetworkService) { }

  getAllPosts(): Observable<Array<Post>> {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    return this.networkServicea.get(url);
  }

  getPost(postId: number): Observable<Post> {
    const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
    return this.networkServicea.get(url);
  }

  getComments(postId: number): Observable<Array<PostComment>> {
    const url = `https://jsonplaceholder.typicode.com/comments`
    return this.networkServicea.get(url, {postId});
  }
}
