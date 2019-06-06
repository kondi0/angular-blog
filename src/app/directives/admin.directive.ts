import {AfterViewInit, Directive, ElementRef, Renderer} from '@angular/core';
import {User} from '../models/auth/user.interface';
import {environment} from '../../environments/environment';

@Directive({
  selector: '[admin]',
  providers: []
})
export class AdminDirective implements AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer) {
  }

  ngAfterViewInit(): void {
    // TODO Se utiliza el atributo hidden, en vez de modificar el dom por un error reconocido de angular con las directivas estructrurales
    const userInfo: User = JSON.parse(localStorage.getItem(environment.userInfo));
    if (userInfo && !userInfo.isAdmin) {
      this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none');
    }
  }
}
