import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthDTO } from '../../models/auth.dto';
import { login } from '../../actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: FormControl;
  password: FormControl;
  loginForm: FormGroup;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private store: Store<AppState>,
  ) {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl('', [
      Validators.required,
      // Validators.minLength(8),
      // Validators.maxLength(16),
    ]);

    this.loginForm = this.fb.group({
      email: this.email,
      password: this.password,
    });
  }
  ngOnInit() {}

  onSubmit(): void {
    const credentials: AuthDTO = {
      email: this.email.value,
      password: this.password.value,
      id: '',
      access_token: '',
    };

    this.store.dispatch(login({ credentials }));
  }
}
