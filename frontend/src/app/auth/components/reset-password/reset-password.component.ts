import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
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
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetPassword: ResetPasswordDTO;
  resetPasswordForm: FormGroup;
  errors: any = null;
  token!: string;

  password: FormControl;
  password_confirmation: FormControl;

  isValidForm: boolean | null;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) {
    const token = this.route.snapshot.paramMap.get('id');
    if(token) {
      this.token = token;
    }
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
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.token = params.token;
    });
  }
  onSubmit() {
    this.isValidForm = false;

    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.isValidForm = true;

    this.resetPassword = this.resetPasswordForm.value;
    this.authService
      .resetPassword({
        token: this.token,
        password: this.resetPassword.password,
        password_confirmation: this.resetPassword.password_confirmation,
      })
      .subscribe(
        (result) => {
          this.sharedService.managementToast(true, 'Contraseña actualizada');
        },
        (error) => {
          this.errors = error.error;
        },
        () => {
          this.resetPasswordForm.reset();
          this.router.navigate(['login']);
        }
      );
  }
}
