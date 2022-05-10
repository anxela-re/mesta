import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PropertyDTO } from '../../models/property.dto';
import { PropertiesService } from '../../services/properties.service';
import {
  faPlus,
  faPencilAlt,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { OnSelectProps } from '../property-item/property-item.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.scss'],
})
export class PropertiesListComponent implements OnInit {
  @Input()
  propertiesSelected: PropertyDTO[] = [];

  @Input()
  allowEdition: boolean = false;

  @Input()
  allowSearch: boolean = true;

  @Output()
  updateProperties: EventEmitter<PropertyDTO[]> = new EventEmitter();

  properties: PropertyDTO[] = [];
  propertiesProfile: PropertyDTO[] = [];

  faPlus = faPlus;
  faPencil = faPencilAlt;
  faSearch = faSearch;

  newProperty: boolean = false;
  editingProperties: boolean = false;

  searchTerm: string = '';

  private reloadList: Subject<any> = new Subject();

  constructor(
    private store: Store<AppState>
  ) {
    this.store.select('properties').subscribe((propertiesState) => {
      if (propertiesState.loaded) {
        this.propertiesProfile = propertiesState.properties;
        this.properties = propertiesState.properties;
      }
    });
  }

  ngOnInit(): void {}

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
