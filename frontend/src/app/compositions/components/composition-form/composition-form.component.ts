import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { PhaseDTO } from 'src/app/phases/models/phase.dto';
import {
  CompositionDTO,
  IPhasesPercentage,
} from '../../models/composition.dto';
import * as compositionsActions from '../../actions';
import { Actions, ofType } from '@ngrx/effects';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { additionValidator } from 'src/app/validators';

@Component({
  selector: 'app-composition-form',
  templateUrl: './composition-form.component.html',
})
export class CompositionFormComponent implements OnInit, OnDestroy {
  @Output()
  onEndEdition: EventEmitter<void> = new EventEmitter();

  @Input()
  composition: CompositionDTO = new CompositionDTO();

  profile_id!: number | undefined;
  phases: PhaseDTO[] | undefined = [];

  compositionForm!: FormGroup;

  name!: FormControl;

  private unsubscribe$ = new Subject<void>();
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private actions$: Actions,
  ) {
    this.store.select('profiles').subscribe(({ selected }) => {
      if (selected) {
        this.profile_id = selected;
      }
    });

    this.store.select('phases').subscribe(({phases, loaded}) => {
      if(loaded) {
        this.phases = phases;
        this.initForm();
      }
    })

    this.actions$
      .pipe(
        ofType(compositionsActions.createCompositionSuccess),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.onEndEdition.emit();
      });

    this.actions$
      .pipe(
        ofType(compositionsActions.updateCompositionSuccess),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.onEndEdition.emit();
      });
  }

  ngOnInit(): void {
    this.initForm();
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  get phases_percentage(): FormArray {
    return this.compositionForm.get('phases_percentage') as FormArray;
  }

  phasesPercentageNameByIndex(i: number): string {
    return this.phases_percentage?.at(i)?.value.phaseName;
  }
  initForm(): void {
    this.name = new FormControl(this.composition.name, [Validators.required]);

    this.compositionForm = this.fb.group({
      name: this.name || '',
      phases_percentage: this.fb.array(
        this.phases?.map((phase: PhaseDTO) => {
          const phases_percentage: IPhasesPercentage | undefined =
            this.composition.phases_percentage?.find(
              (p) => p.phase_id === phase.id
            );

          return this.fb.group({
            phase_id: phase.id,
            phase: phase,
            phaseName: phase.name,
            percentage: new FormControl(
              phases_percentage ? phases_percentage.percentage : 0,
              Validators.required
            ),
          });
        }) || [],
        additionValidator(100)
      ),
    });
  }

  onSubmit(): void {
    if (this.compositionForm.invalid) {
      return;
    }

    this.composition = {
      ...this.composition,
      ...this.compositionForm.value,
      profile_id: this.profile_id,
    };
    this.composition = {
      ...this.composition,
      phases_percentage: this.composition.phases_percentage?.filter((p) => p.percentage !== 0)
    }
    this.composition = {
      ...this.composition,
      phases_id: this.composition.phases_percentage?.map((p) => p.phase_id)
    }
    
    if (this.composition.id) {
      this.store.dispatch(
        compositionsActions.updateComposition({ composition: this.composition })
      );
    } else {
      this.store.dispatch(
        compositionsActions.createComposition({ composition: this.composition })
      );
    }
  }

  onCancel(): void {
    this.onEndEdition.emit();
  }
}
