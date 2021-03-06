import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { finalize } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { LoadingService } from 'src/app/shared/services/loading.service';
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

  password: FormControl;
  password_confirmation: FormControl;

  user!: UserDTO;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private route: ActivatedRoute,
    private userService: UserService,
    private store: Store<AppState>,
    private toastService: ToastService,
    private loadingService: LoadingService
  ) {
    this.store.select('user').subscribe((userState) => {
      if (userState.user) {
        this.user = userState.user;
      }
    });

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
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.resetPassword = this.resetPasswordForm.value;
    const token = this.route.snapshot.queryParams['token'];
    this.loadingService.showLoading('reset_password');
    if (token) {
      this.authService
        .resetPassword({
          token: token,
          password: this.resetPassword.password,
          password_confirmation: this.resetPassword.password_confirmation,
        })
        .pipe(finalize(() => this.loadingService.hideLoading('reset_password')))
        .subscribe(
          () => {
            this.toastService.showToast(true, 'Contrase??a actualizada');
            this.router.navigate(['login']);
          },
          (error) => {
            this.toastService.showToast(
              false,
              error?.error?.message || '??Algo est?? fallando!'
            );
          }
        );
    } else if (this.user) {
      this.userService
        .updateUser({ ...this.user, password: this.resetPassword.password })
        .pipe(finalize(() => this.loadingService.hideLoading('reset_password')))
        .subscribe(
          () => {
            this.toastService.showToast(true, 'Contrase??a actualizada');
            this.router.navigate(['configuration']);
          },
          (error) => {
            this.toastService.showToast(
              false,
              error?.error?.message || '??Algo est?? fallando!'
            );
          }
        );
    }
  }
}
