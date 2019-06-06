import {Pipe, PipeTransform} from '@angular/core';
import {Post} from '../models/posts/post.interface';

@Pipe({
  name: 'filterTitle'
})
export class FilterTitlePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter((post: Post) => {
        if (post.title) {
          return post.title.search(searchText) !== -1;
        }
      });
    }
  }

}
