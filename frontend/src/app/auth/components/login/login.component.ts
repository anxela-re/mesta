import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { Subject } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { takeUntil } from 'rxjs/operators';
import * as ProfilesActions from '../../../profiles/actions';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  email: FormControl;
  password: FormControl;
  loginForm: FormGroup;

  private unsubscribe$ = new Subject<void>();
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private store: Store<AppState>,
    private actions$: Actions
  ) {
    this.actions$
      .pipe(ofType(ProfilesActions.selectProfile), takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.router.navigate(['recipes']);
      });
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
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

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
