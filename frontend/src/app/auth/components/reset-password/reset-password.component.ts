import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
class ResetPasswordDTO {
  password: string;
  password_confirmation: string;

  constructor(password: string, password_confirmation:string) {
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
    private route: ActivatedRoute
  ) {
    this.isValidForm = null;
    this.resetPassword = new ResetPasswordDTO('', '');
    this.password = new FormControl(this.resetPassword.password, [
      Validators.required,
      // Validators.minLength(8),
    ]);

    this.password_confirmation = new FormControl(
      this.resetPassword.password_confirmation,
      [
        Validators.required,
        // Validators.minLength(8),
        //Validartor equal
      ]
    );
    this.resetPasswordForm = this.fb.group({
      password: this.password,
      password_confirmation: this.password_confirmation,
    });
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.token = params.token;
    })
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
          console.log(result);
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
