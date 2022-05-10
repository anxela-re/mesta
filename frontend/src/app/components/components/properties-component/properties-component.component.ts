import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { PhaseDTO } from 'src/app/phases/models/phase.dto';
import { PropertyDTO } from 'src/app/properties/models/property.dto';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-properties-component',
  templateUrl: './properties-component.component.html',
  styleUrls: ['./properties-component.component.scss'],
})
export class PropertiesComponentComponent implements OnInit {
  @Input()
  properties!: PropertyDTO[] | null;

  @Input()
  phase!: PhaseDTO;

  @Input()
  selected: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
