import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { PropertyDTO } from 'src/app/properties/models/property.dto';

@Component({
  selector: 'app-properties-display',
  templateUrl: './properties-display.component.html',
  styleUrls: ['./properties-display.component.scss'],
})
export class PropertiesDisplayComponent implements OnInit {
  @Input()
  properties!: PropertyDTO[] | null;

  @Input()
  color?: string = '#0f172a';

  @Input()
  selected?: boolean = false;

  @Input()
  alignRight: boolean = false;

  propertiesFiltered: PropertyDTO[] = [];

  constructor(private store: Store<AppState>) {
    this.store.select('properties').subscribe(({ filtered }) => {
      this.propertiesFiltered = filtered;
    });
  }

  ngOnInit(): void {}

  getIsFiltered(propertyId: number | undefined): boolean {
    return (
      this.propertiesFiltered.find((p) => p.id === propertyId) !== undefined
    );
  }
}
