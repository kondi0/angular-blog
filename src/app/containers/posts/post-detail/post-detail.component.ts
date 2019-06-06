import {environment} from '../../../../environments/environment';
import {PostsService} from '../../../services/posts/posts.service';
import {Component, OnInit} from '@angular/core';
import {Post} from '../../../models/posts/post.interface';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  post: Post;
  imageUrl: string;

  constructor(private postsService: PostsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.imageUrl = environment.imageUrl;
    this.route.params
      .switchMap((params: Params) => this.postsService.getPost(params.id))
      .subscribe((data: Post) => {
        this.post = {...data};
      });
  }

}
