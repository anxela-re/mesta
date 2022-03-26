import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  errors: any = null;
  token!: string;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.resetPasswordForm = this.fb.group({
      password: [''],
      password_confirmation: [''],
    });
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.token = params.token;
    })
  }
  onSubmit() {
    this.authService
      .resetPassword({
        token: this.token, 
        password: this.resetPasswordForm.value.password,
        password_confirmation: this.resetPasswordForm.value.password_confirmation,
      })
      .subscribe(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.info(error);
          this.errors = error.error;
        },
        () => {
          this.resetPasswordForm.reset();
          this.router.navigate(['login']);
        }
      );
  }
}
