import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { PropertyDTO } from 'src/app/properties/models/property.dto';
import { ComponentDTO } from '../../models/component.dto';

@Component({
  selector: 'app-component-item',
  templateUrl: './component-item.component.html',
  styleUrls: ['./component-item.component.scss'],
})
export class ComponentItemComponent implements OnInit {
  @Input()
  component: ComponentDTO = new ComponentDTO();

  propertiesProfile: PropertyDTO[] = [];

  constructor(private store: Store<AppState>) {
    this.store.select('properties').subscribe((data) => {
      if (data.loaded) {
        this.propertiesProfile = data.properties;
        console.info(this.component);
      }
    });
  }

  ngOnInit(): void {
    this.component.properties = this.component.properties?.map((prop) =>
      this.propertiesProfile.find((p) => p.id === prop)
    );
  }
}
