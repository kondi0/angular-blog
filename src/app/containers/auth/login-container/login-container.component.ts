import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss']
})
export class LoginContainerComponent implements OnInit {

  signInForm: FormGroup;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.signInForm = this.formBuilder.group(
      {
        userName: ['', Validators.required],
        password: ['', Validators.required]
      }
    );
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle();
  }

  signInWithUser() {
    if (!this.authService.signInRegular(this.signInForm.value.userName, this.signInForm.value.password)) {
      this.signInForm.setErrors({'invalidCredentials': true});
    }

  }
}
