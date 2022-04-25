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
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { PhaseDTO } from 'src/app/user/models/phase.dto';
import {
  CompositionDTO,
  IPhasesPercentage,
} from '../../models/composition.dto';

export function additionValidator(value: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const suma = control.value.reduce(
      (acc: number, curr: any) => acc + curr?.percentage,
      0
    );
    return suma === 100 ? null : { additionValidator: suma };
  };
}
@Component({
  selector: 'app-composition-form',
  templateUrl: './composition-form.component.html',
  styleUrls: ['./composition-form.component.scss'],
})
export class CompositionFormComponent implements OnInit {
  profile_id!: number | undefined;
  phases: PhaseDTO[] | undefined = [];

  composition: CompositionDTO = new CompositionDTO();
  compositionForm!: FormGroup;

  name!: FormControl;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.store.select('profiles').subscribe(({ profiles, selected }) => {
      if (selected) {
        this.phases = profiles?.find((p) => p.id === selected)?.phases;
        this.profile_id = selected;
        this.initForm();
      }
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  get phasesPercentage(): FormArray {
    return this.compositionForm.get('phasesPercentage') as FormArray;
  }

  phasesPercentageNameByIndex(i: number): string {
    return this.phasesPercentage?.at(i)?.value.phaseName;
  }
  initForm(): void {
    this.name = new FormControl(this.composition.name, [Validators.required]);

    this.compositionForm = this.fb.group({
      name: this.name || '',
      phasesPercentage: this.fb.array(
        this.phases?.map((phase: PhaseDTO) => {
          const phasePercentage: IPhasesPercentage | undefined =
            this.composition.phasesPercentage?.find(
              (p) => p.phase_id === phase.id
            );

          return this.fb.group({
            phase_id: phase.id,
            phase: phase,
            phaseName: phase.name,
            percentage: new FormControl(
              phasePercentage ? phasePercentage.percentage : 0,
              Validators.required
            ),
          });
        }) || [],
        additionValidator(100)
      ),
    });

    console.info(this.compositionForm.value);
  }

  onSubmit(): void {
    if (this.compositionForm.invalid) {
      return;
    }

    console.info(this.compositionForm.value);
  }
}
