import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from './services/auth/auth.service';
import {User} from './models/auth/user.interface';
import {ToastsManager} from 'ng2-toastr';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user: User;

  constructor(private translate: TranslateService,
              private authService: AuthService,
              private toastr: ToastsManager,
              private vRef: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(this.vRef);
    this.translate.setDefaultLang(navigator.language);
    this.translate.use(navigator.language);
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem(environment.userInfo));
    this.authService.user.subscribe((user: User) => {
      this.user = {...user};
    });
  }

  logout() {
    this.authService.logout();
  }
}
