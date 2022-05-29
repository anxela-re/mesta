import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  email: FormControl;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private toastService: ToastService,
    private loadingService: LoadingService
  ) {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.forgotPasswordForm = this.fb.group({
      email: this.email,
    });
  }
  ngOnInit(): void {}

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    this.loadingService.showLoading('forgot_password');
    this.authService
      .forgotPassword(this.forgotPasswordForm.value.email)
      .pipe(finalize(() => this.loadingService.hideLoading('forgot_password')))
      .subscribe(
        (result: any) => {
          const msg: string = result.msg;
          this.toastService.showToast(
            true,
            msg ? msg : 'Compruebe su correo electrónico'
          );
          this.router.navigate(['login']);
        },
        (error: any) => {
          const msg: string = error?.error?.message;
          this.toastService.showToast(
            false,
            msg ? msg : '¡Algo está fallando!'
          );
        }
      );
  }
}
