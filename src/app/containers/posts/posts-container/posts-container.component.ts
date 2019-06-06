import {Component, OnInit} from '@angular/core';
import {PostsService} from '../../../services/posts/posts.service';
import {Post} from '../../../models/posts/post.interface';
import {PageEvent} from '@angular/material';
import {FilterTitlePipe} from '../../../pipes/filter-title.pipe';
import {listAnimation} from '../../../animations/animations';

@Component({
  selector: 'posts-container',
  templateUrl: './posts-container.component.html',
  styleUrls: ['./posts-container.component.scss'],
  animations: [
    listAnimation
  ]
})
export class PostsContainerComponent implements OnInit {

  pageSize = 2;
  page = 0;
  pageSizeOptions = [2, 5, 10, 100];
  showPagination = true;
  animationsLength = 1;

  posts: Array<Post> = [];
  pagePosts: Array<Post> = [];
  filteredPosts: Array<Post> = [];

  filterInput: string;

  constructor(private postsService: PostsService,
              private filterTitlePipe: FilterTitlePipe) {
  }

  ngOnInit() {
    this.postsService.getPosts().subscribe((posts: Array<Post>) => {
      this.posts = posts;
      this.filteredPosts = this.posts;
      this.resetPage();
    });
  }

  filterPosts(textToFilter: string): void {
    this.filteredPosts = this.filterTitlePipe.transform(this.posts, textToFilter);
    this.resetPage();
  }

  changePage(pageEvent: PageEvent): void {
    const start = pageEvent.pageIndex * pageEvent.pageSize;
    this.pagePosts = [...this.filteredPosts.slice(start, start + pageEvent.pageSize)];
    this.loadAnimations();
  }

  private resetPage(): void {
    this.pagePosts = this.filteredPosts.slice(0, this.pageSize);
    this.loadAnimations();
  }

  private loadAnimations(): void {
    this.animationsLength = this.animationsLength === 1 ? 2 : 1;
  }
}
