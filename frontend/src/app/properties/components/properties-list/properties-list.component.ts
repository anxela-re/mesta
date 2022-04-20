import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PropertyDTO } from '../../models/property.dto';
import { PropertiesService } from '../../services/properties.service';
import { faPlus, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import {
  debounceTime,
  delay,
  distinctUntilChanged,
  mergeMap,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { merge, Observable, Subject } from 'rxjs';
import { OnSelectProps } from '../property-item/property-item.component';

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
  updateSelection: EventEmitter<any> = new EventEmitter();

  properties: PropertyDTO[] = [];

  faPlus = faPlus;
  faPencil = faPencilAlt;

  newProperty: boolean = false;
  editingProperties: boolean = false;

  public properties$: Observable<PropertyDTO[]> | undefined;
  public searchTerm: string = '';

  private searchSubject: Subject<string> = new Subject();
  private reloadList: Subject<any> = new Subject();

  constructor(private propertiesService: PropertiesService) {}

  ngOnInit(): void {
    this.properties$ = merge(
      this.reloadList.pipe(
        switchMap(() => this.propertiesService.getProperties())
      ),
      this.searchSubject.pipe(
        startWith(this.searchTerm),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(() =>
          this.propertiesService.getProperties({
            name: `%${this.searchTerm}%`,
          })
        )
      )
    );
  }

  search() {
    this.searchSubject.next(this.searchTerm);
  }

  onSelectProperty(event: OnSelectProps): void {
    if (event.selected) {
      this.propertiesSelected.push(event.property);
    } else {
      this.propertiesSelected = this.propertiesSelected.filter(
        (property) => property.id !== event.property.id
      );
    }
  }

  onFinishCreating(): void {
    this.reloadList.next();
    this.newProperty = false;
  }

  onPropertyRemoved(): void {
    this.reloadList.next();
    this.editingProperties = false;
  }
}
