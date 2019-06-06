import {MatPaginatorIntl} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import {Injectable} from '@angular/core';

@Injectable()
export class ConasaPaginator extends MatPaginatorIntl {
  constructor(private translate: TranslateService) {
    super();
    Observable.forkJoin(
      this.translate.get(`pagination.nextpage`),
      this.translate.get(`pagination.previouspage`),
      this.translate.get(`pagination.itemsperpage`)
    ).subscribe(([nextPage, previousPage, itemsPerPage]: [string, string, string]) => {
      this.nextPageLabel = nextPage;
      this.previousPageLabel = previousPage;
      this.itemsPerPageLabel = itemsPerPage;
    });
  }
}
