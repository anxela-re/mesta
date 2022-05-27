import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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
    private toastService: ToastService
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
    this.authService
      .forgotPassword(this.forgotPasswordForm.value.email)
      .subscribe(
        (result: any) => {
          const msg: string = result.msg;
          this.toastService.showToast(
            true,
            msg ? msg : 'Compruebe su correo electrónico'
          );
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
