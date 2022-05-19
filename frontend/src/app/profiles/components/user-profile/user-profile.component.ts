import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProfileDTO } from '../../models/profile.dto';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { PhaseDTO } from '../../../phases/models/phase.dto';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as ProfilesActions from '../../actions';
import * as PhasesActions from '../../../phases/actions';
import { IBreadcrumbHistory } from 'src/app/shared/components/breadcrumb/breadcrumb.component';
import { SharedService } from 'src/app/shared/services/shared.service';
import { minLengthArray } from 'src/app/validators';

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

  userId?: number;
  profiles: ProfileDTO[] = [];
  phasesProfile: PhaseDTO[] = [];

  breadcrumbHistory: IBreadcrumbHistory[] = [];

  warnRemoval: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private sharedService: SharedService
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
        this.breadcrumbHistory = [
          {
            name: 'Mi cuenta',
            navigateName: 'configuration',
          },
          {
            name: foundProfile.name,
          },
        ];
      } else {
        this.profile = new ProfileDTO({});
        this.breadcrumbHistory = [
          {
            name: 'Configuración',
            navigateName: 'configuration',
          },
          {
            name: 'Nuevo perfil',
          },
        ];
      }
      this.initForm();
    });
  }

  get phases(): FormArray {
    return this.profileForm.get('phases') as FormArray;
  }

  ngOnInit(): void {}

  getIdModal(): string {
    return 'warning-phase-removal';
  }

  setWarnGiven() {
    this.warnRemoval = true;
  }

  initForm(): void {
    this.name = new FormControl(this.profile.name, [
      Validators.required,
      Validators.maxLength(64),
    ]);
    this.description = new FormControl(this.profile.description);

    this.profileForm = this.fb.group({
      name: this.name,
      description: this.description,
      color: this.color,
      phases: this.fb.array(
        this.profile.phases?.map((phase: PhaseDTO) =>
          this.fb.group({
            name: new FormControl(phase.name, [Validators.required]),
            color: new FormControl(phase.color, [Validators.required]),
            ...phase,
          })
        ) || [],
        minLengthArray(1)
      ),
    });
  }

  addNewPhase(): void {
    this.phases.push(
      this.fb.group({
        name: new FormControl('', [Validators.required]),
        color: new FormControl('#ea526f', [Validators.required]),
      })
    );
  }

  removePhase(i: number, phaseForm: AbstractControl): void {
    if (this.warnRemoval || !phaseForm.value.id) {
      this.phases.removeAt(i);
    } else {
      this.sharedService.openModal(
        this.getIdModal(),
        '¡Cuidado!',
        'Si elimina una fase los componentes asociados se eliminarán, así como las composiciones y las recetas en las que esté presente, ¿Desea continuar de todas formas?'
      );
      this.setWarnGiven();
    }
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
          .filter((p) => p !== undefined)
          .concat(
            this.phases.value.filter((newPhase: PhaseDTO) => !newPhase.id)
          ),
      };
      if (phasesToDelete) {
        phasesToDelete.forEach((p: PhaseDTO) => {
          if (p.id && this.profile.id) {
            this.store.dispatch(
              PhasesActions.deletePhase({
                phaseId: p.id,
                profile_id: this.profile.id,
              })
            );
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
              this.store.dispatch(PhasesActions.updatePhase({ phase: phase }));
            }
          } else {
            this.store.dispatch(
              PhasesActions.createPhase({
                phase: new PhaseDTO({ ...phase, profile_id: this.profile.id }),
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
        const newProfile: ProfileDTO = {
          name: this.profile.name,
          description: this.profile.description,
          user_id: this.userId,
          phases: this.phases.value,
        };

        this.store.dispatch(
          ProfilesActions.createProfile({
            profile: newProfile,
            phases: this.profile.phases,
          })
        );
      }
    }
  }
}
