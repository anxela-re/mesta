import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { PropertyDTO } from '../../models/property.dto';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import * as propretyActions from '../../actions';
import { Actions, ofType } from '@ngrx/effects';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
})
export class PropertyFormComponent implements OnInit, OnDestroy {
  @Output()
  onFinishCreating: EventEmitter<any> = new EventEmitter();

  property!: PropertyDTO;
  propertyForm!: FormGroup;

  name!: FormControl;

  profileId!: number;

  faSave = faSave;

  private unsubscribe$ = new Subject<void>();
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private actions$: Actions
  ) {
    this.store.select('profiles').subscribe(({ selected }) => {
      if (selected) {
        this.profileId = selected;
      }
    });
    this.actions$
      .pipe(
        ofType(propretyActions.createPropertySuccess),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.onFinishCreating.emit();
        this.propertyForm.reset();
      });

    this.property = new PropertyDTO();
    this.name = new FormControl(this.property.name, [Validators.required]);
    this.propertyForm = this.fb.group({
      name: this.name,
    });
  }

  ngOnInit(): void {}
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit(): void {
    if (this.propertyForm.invalid) {
      return;
    }

    this.store.dispatch(
      propretyActions.createProperty({
        property: {
          ...this.propertyForm.value,
          profile_id: this.profileId,
        },
      })
    );
  }
}
