import { Component, Input, OnInit, Output } from '@angular/core';
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

  properties: PropertyDTO[] = [];

  faPlus = faPlus;
  faPencil = faPencilAlt;

  public properties$: Observable<PropertyDTO[]> | undefined;
  public searchTerm: string = '';

  private searchSubject: Subject<string> = new Subject();
  private reloadList: Subject<PropertyDTO[]> = new Subject();

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
      ),
    );
  }

  search() {
    this.searchSubject.next(this.searchTerm);
  }
}
