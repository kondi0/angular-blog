import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import * as _ from 'lodash';
import {User} from '../../models/auth/user.interface';
import {environment} from '../../../environments/environment';

@Injectable()
export class AdminGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private router: Router) {
  }

  canLoad(route: Route) {
    return this.checkAdmin();
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkAdmin();
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }

  private checkAdmin() {
    if (this.isLoggedIn()) {
      return true;
    }

    this.router.navigate([`/posts`]);

    return false;
  }

  private isLoggedIn(): boolean {
    const userInfo: User = JSON.parse(localStorage.getItem(environment.userInfo));
    return !_.isEmpty(userInfo) && userInfo.isAdmin;
  }
}
