import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { UserService } from '../../services/user.service';
import * as UserActions from '../../actions';
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
import { ModalService } from 'src/app/shared/services/modal.service';

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

const links = [
  'personalInformation',
  'profiles',
  'theme',
  'account',
  'contact',
];
@Component({
  selector: 'app-user-configuration',
  templateUrl: './user-configuration.component.html',
  styleUrls: ['./user-configuration.component.scss'],
})
export class UserConfigurationComponent implements OnInit {
  @ViewChild('personalInfoSection') personalInfoSection!: ElementRef;
  @ViewChild('profilesSection') profilesSection!: ElementRef;
  @ViewChild('accountSection') accountSection!: ElementRef;
  @ViewChild('themeSection') themeSection!: ElementRef;
  @ViewChild('contactSection') contactSection!: ElementRef;

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

  activeLink: string = links[0];

  constructor(
    public userService: UserService,
    private store: Store<AppState>,
    private fb: FormBuilder,
    public scroller: ViewportScroller,
    private router: Router,
    private modalService: ModalService,
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

  @HostListener('window:scroll', [])
  onScroll(): void {
    const personalInfoEl = this.personalInfoSection.nativeElement as Element;
    const profilesEl = this.profilesSection.nativeElement as Element;
    const accountsEl = this.accountSection.nativeElement as Element;
    const themeEl = this.themeSection.nativeElement as Element;
    
    const limitValue = window.innerHeight - window.innerHeight / 2;
    if (
      (personalInfoEl.getBoundingClientRect().top > 0 &&
        personalInfoEl.getBoundingClientRect().top < limitValue) ||
      this.scroller.getScrollPosition()[1] === 0
    ) {
      this.activeLink = links[0];
    } else if (
      this.scroller.getScrollPosition()[1] >=
      document.body.scrollHeight - window.innerHeight
    ) {
      this.activeLink = links[4];
    } else if (
      profilesEl.getBoundingClientRect().top < limitValue &&
      profilesEl.getBoundingClientRect().top > 0
    ) {
      this.activeLink = links[1];
    } else if (
      themeEl.getBoundingClientRect().top < limitValue &&
      themeEl.getBoundingClientRect().top > 0
    ) {
      this.activeLink = links[2];
    } else if (
      accountsEl.getBoundingClientRect().top < limitValue &&
      accountsEl.getBoundingClientRect().top > 0
    ) {
      this.activeLink = links[3];
    }
  }

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
    this.modalService.openModal(
      this.getIdModal(),
      '¡Cuidado!',
      'Si elimina la cuenta no podrá recuperar los datos almacenados, ¿Desea continuar de todas formas?'
    );
  }

  deleteUserConfirm(): void {
    if (this.user.id) {
      const id = this.user.id;
      this.store.dispatch(UserActions.deleteUser({ userId: id }));
    }
  }

  toggleTheme(): void {
    this.sharedService.toggleTheme();
  }
}
