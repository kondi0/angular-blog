import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Post} from '../../models/posts/post.interface';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  post: Post;

  hovering = false;

  constructor() {

  }

  @HostListener('mouseover') onMouseOver() {
    this.hovering = true;
  }

  @HostListener('mouseout') onMouseOut() {
    this.hovering = false;
  }

  ngOnInit() {
  }
}
