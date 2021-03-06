import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { PropertyDTO } from '../../models/property.dto';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as propertiesActions from '../../actions';
import { Actions, ofType } from '@ngrx/effects';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

export interface OnSelectProps {
  property: PropertyDTO;
  selected: boolean;
}

@Component({
  selector: 'app-property-item',
  templateUrl: './property-item.component.html',
})
export class PropertyItemComponent implements OnInit, OnDestroy {
  @Input()
  property!: PropertyDTO;
  @Input()
  selected: boolean = false;
  @Input()
  editing: boolean = false;
  @Output()
  onSelect: EventEmitter<OnSelectProps> = new EventEmitter();
  @Output()
  onRemoved: EventEmitter<any> = new EventEmitter();
  @Input()
  allowEdition: boolean = true;

  propertyEdited: string | undefined;

  edited: boolean = false;

  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store<AppState>, private actions$: Actions) {
    this.actions$
      .pipe(
        ofType(propertiesActions.updatePropertySuccess),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.edited = false;
      });

    this.actions$
      .pipe(
        ofType(propertiesActions.deletePropertySuccess),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.onRemoved.emit();
      });
  }

  ngOnInit(): void {
    if (this.property) {
      this.propertyEdited = this.property.name;
    } else {
      this.propertyEdited = '';
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  select(): void {
    if (this.property && !this.editing && this.allowEdition) {
      this.selected = !this.selected;
      this.onSelect.emit({
        property: this.property,
        selected: this.selected,
      });
    }
  }

  onPropertyChange(event: any): void {
    this.edited = true;
    if (event?.target?.textContent) {
      this.propertyEdited = event?.target?.textContent;
    }
  }

  onSaveEdition(event: MouseEvent): void {
    event.stopPropagation();
    if (this.edited) {
      this.store.dispatch(
        propertiesActions.updateProperty({
          property: { ...this.property, name: this.propertyEdited },
        })
      );
    }
  }
  onDeleteProperty(event: MouseEvent): void {
    event.stopPropagation();
    if (this.editing && this.property.id && this.property.profile_id) {
      this.store.dispatch(
        propertiesActions.deleteProperty({
          propertyId: this.property.id,
          profile_id: this.property.profile_id,
        })
      );
    }
  }
}
