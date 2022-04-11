import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RegisterDTO } from '../../models/register.dto';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import {UserActions} from '../../actions';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerUser: RegisterDTO;

  name: FormControl;
  email: FormControl;
  password: FormControl;
  password_confirmation: FormControl;

  registerForm: FormGroup;
  isValidForm: boolean | null;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    public store: Store<AppState>
  ) {
    this.registerUser = new RegisterDTO('', '', '', '');

    this.isValidForm = null;

    this.name = new FormControl(this.registerUser.name, [
      Validators.required,
      // Validators.minLength(5),
      // Validators.maxLength(25),
    ]);

    this.email = new FormControl(this.registerUser.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl(this.registerUser.password, [
      Validators.required,
      // Validators.minLength(8),
    ]);

    this.password_confirmation = new FormControl(
      this.registerUser.password_confirmation,
      [
        Validators.required,
        // Validators.minLength(8),
        //Validartor equal
      ]
    );

    this.registerForm = this.fb.group({
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation,
    });
  }
  ngOnInit() {}
  onSubmit() {
    this.isValidForm = false;

    if (this.registerForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.registerUser = this.registerForm.value;

    const user: RegisterDTO = {
      name: this.registerUser.name,
      email: this.registerUser.email,
      password: this.registerUser.password,
      password_confirmation: this.registerUser.password_confirmation,
    };

    this.store.dispatch(UserActions.register({ user }));

    // this.authService.register(this.registerForm.value).subscribe(
    //   (result) => {
    //     console.log(result);
    //   },
    //   (error) => {
    //     console.info(error)
    //     this.errors = error.error;
    //   },
    //   () => {
    //     this.registerForm.reset();
    //     this.router.navigate(['login']);
    //   }
    // );
  }
}
