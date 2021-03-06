import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PropertyDTO } from '../../models/property.dto';
import { Subject } from 'rxjs';
import { OnSelectProps } from '../property-item/property-item.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as propertiesActions from '../../actions';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
})
export class PropertiesListComponent implements OnInit {
  @Input()
  propertiesSelected: PropertyDTO[] = [];

  @Input()
  allowEdition: boolean = false;

  @Input()
  filtering: boolean = false;

  @Output()
  updateProperties: EventEmitter<PropertyDTO[]> = new EventEmitter();

  properties: PropertyDTO[] = [];
  propertiesProfile: PropertyDTO[] = [];

  newProperty: boolean = false;
  editingProperties: boolean = false;

  searchTerm: string = '';

  private reloadList: Subject<any> = new Subject();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('properties').subscribe((propertiesState) => {
      if (propertiesState.loaded) {
        this.propertiesProfile = propertiesState.properties;
        this.properties = propertiesState.properties;
        if (this.filtering) {
          this.propertiesSelected = propertiesState.filtered;
        }
      }
    });
  }

  search() {
    this.properties = this.propertiesProfile.filter(
      ({ name }) => name && name.includes(this.searchTerm)
    );
  }

  onSelectProperty(event: OnSelectProps): void {
    if (event.selected) {
      this.propertiesSelected.push(event.property);
    } else {
      this.propertiesSelected = this.propertiesSelected.filter(
        (property) => property.id !== event.property.id
      );
    }

    if (this.filtering) {
      this.store.dispatch(
        propertiesActions.filteredProperties({
          properties: this.propertiesSelected,
        })
      );
    }
    this.updateProperties.emit(this.propertiesSelected);
  }

  onFinishCreating(): void {
    this.reloadList.next();
    this.newProperty = false;
  }

  onPropertyRemoved(): void {
    this.reloadList.next();
    this.editingProperties = false;
  }
  isSelected(id: number | undefined): boolean {
    return (
      id !== undefined &&
      this.propertiesSelected.find((prop) => prop.id === id) !== undefined
    );
  }
}
