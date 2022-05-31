import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ContactDTO } from '../../models/contact.dto';
import { ContactService } from '../../services/contact.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html'
})
export class LandingPageComponent implements OnInit {
  contact: ContactDTO;
  contactForm: FormGroup;

  name: FormControl;
  email: FormControl;
  body: FormControl;

  constructor(
    private contactService: ContactService,
    private toastService: ToastService,
    private fb: FormBuilder
  ) {
    this.contact = new ContactDTO();
    this.name = new FormControl(this.contact.name, [Validators.required]);
    this.email = new FormControl(this.contact.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);
    this.body = new FormControl(this.contact.body, [Validators.required]);
    this.contactForm = this.fb.group({
      name: this.name,
      email: this.email,
      body: this.body,
    });
  }

  ngOnInit(): void {}

  onSubmitContactForm(): void {
    if (this.contactForm.invalid) {
      return;
    }
    this.contact = this.contactForm.value;

    this.contactService.contact(this.contact).subscribe(
      () => {
        this.contactForm.reset();
        this.toastService.showToast(
          true,
          'Muchas gracias, espero que podamos resolver tus dudas'
        );
      },
      (error) => {
        console.error(error);
        this.toastService.showToast(false, '¡Algo está fallando!');
      }
    );
  }
}
