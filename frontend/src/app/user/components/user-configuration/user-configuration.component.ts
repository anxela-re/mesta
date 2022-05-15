import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { UserService } from '../../services/user.service';
import * as UserActions from '../../actions';
import * as ProfilesActions from '../../../profiles/actions';
import * as AuthActions from '../../../auth/actions';
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
import { ProfileDTO } from '../../../profiles/models/profile.dto';
import { SharedService } from 'src/app/shared/services/shared.service';

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

  profiles: ProfileDTO[] = [];

  constructor(
    public userService: UserService,
    private store: Store<AppState>,
    private fb: FormBuilder,
    public scroller: ViewportScroller,
    private router: Router,
    private sharedService: SharedService
  ) {
    this.isValidForm = null;
    this.store.select('user').subscribe(({ user }) => {
      this.user = user;

      this.name = new FormControl(this.user.name, [Validators.required]);

      this.email = new FormControl(this.user.email, [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]);

      this.userForm = this.fb.group({
        name: this.name,
        email: this.email,
      });
    });

    this.store.select('profiles').subscribe(({ profiles }) => {
      this.profiles = profiles;
    });

    this.isValidContactForm = null;
    this.contact = new ContactDTO('', '', '');
    this.nameContact = new FormControl(this.contact.name, [
      Validators.required,
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

  ngOnInit(): void {}

  getIdModal(): string {
    return 'user-delete-' + this.user.id;
  }

  onSubmit(): void {
    this.store.dispatch(
      UserActions.updateUser({ user: { ...this.user, ...this.userForm.value } })
    );
  }

  onContact(): void {
    // TODO
  }

  createProfile(): void {
    this.router.navigate(['/profile', 'new']);
  }

  deleteUser(): void {
    this.sharedService.openModal(
      this.getIdModal(),
      '¡Cuidado!',
      'Si elimina la cuenta no podrá recuperar los datos almacenados, ¿Desea continuar de todas formas?'
    );
  }

  deleteUserConfirm(): void {
    if (this.user.id) {
      const id = this.user.id;
      localStorage.clear();
      this.store.dispatch(AuthActions.logout());
      this.store.dispatch(UserActions.deleteUser({ userId: id }));
      this.router.navigateByUrl('/');
    }
  }

  toggleTheme () :void {
    console.info(localStorage.theme)
    // this.sharedService.changeTheme('')
    this.sharedService.toggleTheme();
  }
}
