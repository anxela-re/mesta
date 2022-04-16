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
import { NewProfileDTO, ProfileDTO } from '../../models/profile.dto';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { PhaseDTO } from '../../models/phase.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { UserService } from '../../services/user.service';
import { PhasesActions, ProfilesActions } from '../../actions';
import { IBreacrumbHistory } from 'src/app/shared/components/breadcrumb/breadcrumb.component';

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
  // phases!: FormArray;

  isValidForm: boolean = false;
  palettes!: any[];

  userId?: number;
  profiles: ProfileDTO[] = [];

  breacrumbHistory: IBreacrumbHistory[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    const profileId = this.route.snapshot.paramMap.get('id');
    this.store.select('user').subscribe(({ user }) => {
      this.userId = user.id;
    });

    this.store.select('profiles').subscribe(({ profiles }) => {
      const foundProfile = profiles.find(
        ({ id }) => id?.toString() === profileId?.toString()
      );
      if (profileId && foundProfile) {
        this.profile = new ProfileDTO(foundProfile);
        this.breacrumbHistory = [
          {
            name: 'Configuración',
            navigateName: 'configuration',
          },
          {
            name: foundProfile.name,
          },
        ];
      } else {
        this.profile = new ProfileDTO({});
        this.breacrumbHistory = [
          {
            name: 'Configuración',
            navigateName: 'configuration',
          },
          {
            name: 'Crear perfil',
          },
        ];
      }

      this.name = new FormControl(this.profile.name, [
        Validators.required,
        Validators.maxLength(64),
      ]);
      this.description = new FormControl(this.profile.description);
      // this.color = new FormControl(this.profile.color, [Validators.required]);

      this.profileForm = this.fb.group({
        name: this.name,
        description: this.description,
        color: this.color,
        phases: this.fb.array(
          this.profile?.phases?.map((phase: PhaseDTO) =>
            this.fb.group({
              name: new FormControl(phase.name, [Validators.required]),
              color: new FormControl(phase.color, [Validators.required]),
              ...phase,
            })
          ) || [],
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

    if (this.profile?.id) {
      const phasesToDelete: PhaseDTO[] = [];
      const updatedProfile = {
        ...this.profile,
        ...this.profileForm.value,
        phases: this.profile.phases
          ?.map((phase) => {
            const phaseFound = this.phases.value.find(
              (formPhase: any) => formPhase.id === phase.id
            );
            if (phaseFound) {
              return {
                ...phase,
                ...this.phases.value.find(
                  (formPhase: any) => formPhase.id === phase.id
                ),
              };
            } else {
              phasesToDelete.push(phase);
            }
          })
          .filter((p) => p !== undefined),
      };
      if (phasesToDelete) {
        phasesToDelete.forEach((p: PhaseDTO) => {
          if (p.id) {
            this.store.dispatch(PhasesActions.deletePhase({ phaseId: p.id }));
          }
        });
      }
      if (updatedProfile.phases.length > 0) {
        updatedProfile.phases.forEach((phase: PhaseDTO) => {
          if (phase.id) {
            if (
              JSON.stringify(phase) !==
              JSON.stringify(
                this.profile.phases?.find((p) => p.id === phase.id)
              )
            ) {
              this.store.dispatch(
                PhasesActions.updatePhase({ phase: phase, phaseId: phase.id })
              );
            }
          } else {
            this.store.dispatch(
              PhasesActions.createPhase({
                phase: new PhaseDTO({ ...phase, profile_id: this.profile.id }),
                profileId: updatedProfile.id,
              })
            );
          }
        });
      }
      this.store.dispatch(
        ProfilesActions.updateProfile({ profile: updatedProfile })
      );
    } else {
      this.profile = this.profileForm.value;
      if (this.userId) {
        const res: NewProfileDTO = {
          name: this.profile.name,
          description: this.profile.description,
          user_id: this.userId,
        };

        this.store.dispatch(ProfilesActions.createProfile({ profile: res }));
      }
    }
  }
}
