import {ActivatedRoute, Params} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PostsService} from '../../../services/posts/posts.service';
import {Post} from '../../../models/posts/post.interface';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {
  editForm: FormGroup;
  post: Post;

  constructor(private formBuilder: FormBuilder,
              private postsService: PostsService,
              private route: ActivatedRoute,
              public toastr: ToastsManager) {
    this.editForm = this.formBuilder.group({
      title: '',
      body: ''
    });
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.postsService.getPost(params.id))
      .subscribe((post: Post) => {
        this.post = {...post};
        this.editForm.patchValue({
          title: post.title,
          body: post.body
        });
      });
  }

  save() {
    this.postsService.updatePost({...this.post, title: this.editForm.value.title, body: this.editForm.value.body})
      .subscribe(() => {
        this.toastr.success(`El post se ha guardado! (Es mentira, esto es solo una prueba pero tu post tiene este valor:
        ${JSON.stringify(this.editForm.value)})`, 'Success!');
      });
  }
}
