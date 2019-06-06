import {Injectable, NgZone} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import {Subject} from 'rxjs/Subject';
import {User} from '../../models/auth/user.interface';
import {environment} from '../../../environments/environment';

@Injectable()
export class AuthService {
  public user: Subject<User> = new Subject<User>();

  constructor(private firebaseAuth: AngularFireAuth,
              private router: Router,
              private zone: NgZone) {
  }

  signInWithGoogle() {
    this.firebaseAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(response => {
        const userInfo: User = {
          userName: response.additionalUserInfo.profile.name,
          isAdmin: true
        };
        localStorage.setItem(environment.userInfo, JSON.stringify(userInfo));
        this.user.next(userInfo);
        this.zone.run(() => {
          this.router.navigateByUrl('/posts');
        });
      });
  }

  signInRegular(userName, password): boolean {
    // TODO Fake login with user
    if (userName === 'user' && password === 'user') {
      const userInfo: User = {
        userName: userName,
        isAdmin: false
      };

      this.user.next(userInfo);
      localStorage.setItem(environment.userInfo, JSON.stringify(userInfo));
      this.zone.run(() => {
        this.router.navigateByUrl('/posts');
      });
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.firebaseAuth.auth.signOut().then(res => {
      localStorage.removeItem(environment.userInfo);
      this.user.next(null);
      this.router.navigate(['/login']);
    });
  }
}
