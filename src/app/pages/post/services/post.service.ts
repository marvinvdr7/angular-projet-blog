import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

 
  constructor(private httpClient: HttpClient) {  }

  ngOnInit(): void {  }
  
  public getAllPost(): Observable<Post[]> {
    return this.httpClient.get<Post[]>('http://localhost:8080/posts');
  }

  public getPost(id: number): Observable<Post> {
    return this.httpClient.get<Post>("http://localhost:8080/posts/" + id);
  }

  public createPost(post: Post): Observable<Post> {
    return this.httpClient.post<Post>("http://localhost:8080/posts", post);
  }

  public updatePost(postUpdate: Post): Observable<Post> {
    return this.httpClient.put<Post>("http://localhost:8080/posts/"+ postUpdate.id, postUpdate);
  }

  public deletePost(id: number): Observable<Post> {
    return this.httpClient.delete<Post>("http://localhost:8080/posts/" + id);
  }

  public getAllPostByCategoryId(id: number): Observable<Post[]> {
    return this.httpClient.get<Post[]>('http://localhost:8080/posts/category/' + id);
  }
}
