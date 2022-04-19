import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { PropertyDTO } from '../../models/property.dto';
import { PropertiesService } from '../../services/properties.service';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss'],
})
export class PropertyFormComponent implements OnInit {
  property!: PropertyDTO;
  propertyForm!: FormGroup;

  name!: FormControl;

  profileId!: number;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private propertiesService: PropertiesService
  ) {
    this.store.select('profiles').subscribe(({ selected }) => {
      if (selected) {
        this.profileId = selected;
      }
    });

    this.property = new PropertyDTO();
    this.name = new FormControl(this.property.name, [Validators.required]);
    this.propertyForm = this.fb.group({
      name: this.name,
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.propertiesService
      .createProperty({
        ...this.propertyForm.value,
        profile_id: this.profileId,
      })
      .subscribe((data) => console.info(data));
  }
}
