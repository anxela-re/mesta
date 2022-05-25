import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UserDTO } from 'src/app/user/models/user.dto';
import { UserService } from 'src/app/user/services/user.service';
import { matchEqual } from 'src/app/validators';
import { AuthService } from '../../services/auth.service';
class ResetPasswordDTO {
  password: string;
  password_confirmation: string;

  constructor(password: string, password_confirmation: string) {
    this.password = password;
    this.password_confirmation = password_confirmation;
  }
}
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  resetPassword: ResetPasswordDTO;
  resetPasswordForm: FormGroup;
  token!: string;

  password: FormControl;
  password_confirmation: FormControl;

  isValidForm: boolean | null;

  user!: UserDTO;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private route: ActivatedRoute,
    private userService: UserService,
    private store: Store<AppState>,
    private toastService: ToastService
  ) {
    const token = this.route.snapshot.paramMap.get('id');
    if (token) {
      this.token = token;
    }

    this.store.select('user').subscribe((userState) => {
      if (userState.user) {
        this.user = userState.user;
      }
    });

    this.isValidForm = null;
    this.resetPassword = new ResetPasswordDTO('', '');
    this.password = new FormControl(this.resetPassword.password, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(16),
    ]);

    this.password_confirmation = new FormControl(
      this.resetPassword.password_confirmation,
      [Validators.required, matchEqual(this.password)]
    );
    this.resetPasswordForm = this.fb.group({
      password: this.password,
      password_confirmation: this.password_confirmation,
    });
  }
  ngOnInit(): void {}
  onSubmit() {
    this.isValidForm = false;

    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.isValidForm = true;

    this.resetPassword = this.resetPasswordForm.value;
    if (this.token) {
      this.authService
        .resetPassword({
          token: this.token,
          password: this.resetPassword.password,
          password_confirmation: this.resetPassword.password_confirmation,
        })
        .subscribe(
          (result) => {
            this.toastService.showToast(true, 'Contraseña actualizada');
          },
          (error) => {
            this.toastService.showToast(
              true,
              error?.error?.message || '¡Algo está fallando!'
            );
          },
          () => {
            this.resetPasswordForm.reset();
            this.router.navigate(['login']);
          }
        );
    } else if (this.user) {
      this.userService
        .updateUser({ ...this.user, password: this.resetPassword.password })
        .subscribe(
          (result) => {
            this.toastService.showToast(true, 'Contraseña actualizada');
          },
          (error) => {
            this.toastService.showToast(
              true,
              error?.error?.message || '¡Algo está fallando!'
            );
          },
          () => {
            this.resetPasswordForm.reset();
            this.router.navigate(['configuration']);
          }
        );
    }
  }
}
