import {MatCardModule} from '@angular/material/card';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PostsContainerComponent} from './posts-container/posts-container.component';
import {PostsService} from '../../services/posts/posts.service';
import {CardComponent} from '../../components/card/card.component';
import {MatInputModule, MatPaginatorIntl, MatPaginatorModule} from '@angular/material';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {TruncatePipe} from '../../pipes/truncate.pipe';
import {FilterTitlePipe} from '../../pipes/filter-title.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConasaPaginator} from '../../core/paginator';
import {AdminDirective} from '../../directives/admin.directive';
import {PostDetailComponent} from './post-detail/post-detail.component';
import {PostEditComponent} from './post-edit/post-edit.component';
import {AdminGuard} from '../../services/auth/admin-guard.service';

export const routes: Routes = <Routes>[
  {
    path: '',
    children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      {
        path: 'list',
        component: PostsContainerComponent
      },
      {
        path: 'detail/:id',
        component: PostDetailComponent
      },
      {
        path: 'edit/:id',
        component: PostEditComponent,
        canActivate: [AdminGuard],
        canActivateChild: [AdminGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatPaginatorModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
  ],
  declarations: [
    PostsContainerComponent,
    CardComponent,
    TruncatePipe,
    FilterTitlePipe,
    AdminDirective,
    PostDetailComponent,
    PostEditComponent
  ],
  providers: [
    AdminGuard,
    PostsService,
    FilterTitlePipe,
    {
      provide: MatPaginatorIntl,
      useClass: ConasaPaginator,
      deps: [TranslateService]
    }
  ]
})
export class PostsModule {
}
