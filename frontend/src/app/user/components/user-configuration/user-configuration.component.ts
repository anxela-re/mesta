import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { UserService } from '../../services/user.service';
import * as UserAction from '../../actions';
import { UserDTO } from '../../models/user.dto';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { faSave, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';

class ContactDTO {
  name!: string;
  email!: string;
  body!: string;

  constructor(name: string, email: string, body: string) {
    this.name = name;
    this.email = email;
    this.body = body;
  }
}
@Component({
  selector: 'app-user-configuration',
  templateUrl: './user-configuration.component.html',
  styleUrls: ['./user-configuration.component.scss'],
})
export class UserConfigurationComponent implements OnInit {
  user!: UserDTO;
  userForm!: FormGroup;

  name!: FormControl;
  email!: FormControl;
  isValidForm: boolean | null;

  contact: ContactDTO;
  contactForm: FormGroup;

  nameContact: FormControl;
  emailContact: FormControl;
  bodyContact: FormControl;

  isValidContactForm: boolean | null;

  faSave = faSave;
  faPlus = faPlus;
  faTrash = faTrashAlt;

  constructor(
    public userService: UserService,
    private store: Store<AppState>,
    private fb: FormBuilder,
    public scroller: ViewportScroller,
    private router: Router
  ) {
    this.isValidForm = null;
    this.store.select('user').subscribe(({ user }) => {
      this.user = user;

      this.name = new FormControl(this.user.name, [
        Validators.required,
        // Validators.minLength(5),
        // Validators.maxLength(25),
      ]);

      this.email = new FormControl(this.user.email, [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]);

      this.userForm = this.fb.group({
        name: this.name,
        email: this.email,
      });
    });

    this.isValidContactForm = null;
    this.contact = new ContactDTO('', '', '');
    this.nameContact = new FormControl(this.contact.name, [
      Validators.required,
      // Validators.minLength(5),
      // Validators.maxLength(25),
    ]);
    this.emailContact = new FormControl(this.contact.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);
    this.bodyContact = new FormControl(this.contact.body, [
      Validators.required,
    ]);
    this.contactForm = this.fb.group({
      nameContact: this.nameContact,
      emailContact: this.emailContact,
      bodyContact: this.bodyContact,
    });
  }

  ngOnInit(): void {
    this.store.dispatch(UserAction.getUser());
  }

  onSubmit(): void {
    console.info(this.userForm);
    console.info(this.name);
  }

  onContact(): void {
    console.info(this.contactForm);
  }

  createProfile(): void {
    this.router.navigateByUrl('profile');
  }
}
