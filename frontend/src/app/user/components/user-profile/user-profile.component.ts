import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ProfileDTO } from '../../models/profile.dto';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { PhaseDTO } from '../../models/phase.dto';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';

export function minLengthArray(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value.length >= min)
      return control.value.length >= min ? null : { minLengthArray: true };

    return { minLengthArray: true };
  };
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;

  profile!: ProfileDTO;
  profileForm!: FormGroup;
  name!: FormControl;
  description!: FormControl;
  color!: FormControl;
  // phases: FormArray;

  isValidForm: boolean = false;
  palettes!: any[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.store.select('user').subscribe(({ user }) => {
      const profileId = this.route.snapshot.paramMap.get('id');
      const foundProfile = user.profiles.find(({ id }) => id === profileId);
      if (profileId && foundProfile) {
        this.profile = foundProfile;
      } else {
        this.profile = new ProfileDTO('', '', '#ea526f', [
          new PhaseDTO('Fase', '#ea526f'),
        ]);
      }

      this.name = new FormControl(this.profile.name, [
        Validators.required,
        Validators.maxLength(64),
      ]);
      this.description = new FormControl(this.profile.description, [
        Validators.required,
      ]);
      this.color = new FormControl(this.profile.color, [Validators.required]);

      this.profileForm = this.fb.group({
        name: this.name,
        description: this.description,
        color: this.color,
        phases: this.fb.array(
          this.profile.phases.map((phase: PhaseDTO) =>
            this.fb.group({
              name: new FormControl(phase.name, [Validators.required]),
              color: new FormControl(phase.color, [Validators.required]),
            })
          ),
          minLengthArray(1)
        ),
      });
    });
  }

  get phases(): FormArray {
    return this.profileForm.get('phases') as FormArray;
  }

  ngOnInit(): void {}

  addNewPhase(): void {
    this.phases.push(
      this.fb.group({
        name: new FormControl('', [Validators.required]),
        color: new FormControl('#ea526f', [Validators.required]),
      })
    );
  }

  onSubmit(): void {
    this.isValidForm = false;

    if (this.profileForm.invalid) {
      return;
    }

    this.isValidForm = true;

    this.profile = this.profileForm.value;

    console.info(this.profile);
  }
}
