import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Post} from '../../models/posts/post.interface';

@Injectable()
export class PostsService {
  readonly api = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(`${this.api}/posts`);
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.api}/posts/${id}`);
  }

  updatePost(post: Post): Observable<any> {
    return this.http.put<Post>(`${this.api}/posts/${post.id}`, post);
  }


}
