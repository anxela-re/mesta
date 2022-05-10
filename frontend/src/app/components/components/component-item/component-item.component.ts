import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { PropertyDTO } from 'src/app/properties/models/property.dto';
import { PhaseDTO } from 'src/app/phases/models/phase.dto';
import { ComponentDTO } from '../../models/component.dto';
import { IChangePercentage } from '../components-phase/components-phase.component';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-component-item',
  templateUrl: './component-item.component.html',
  styleUrls: ['./component-item.component.scss'],
})
export class ComponentItemComponent implements OnInit {

  @Input()
  component!: ComponentDTO;

  @Input()
  properties!: PropertyDTO[] | null;

  @Input()
  fromFormulation: boolean = false;

  @Input()
  fromRecipeDetails: boolean = false;

  @Input()
  phase!: PhaseDTO;

  @Output()
  onPercentageChange: EventEmitter<IChangePercentage> = new EventEmitter();

  @Input()
  percentage: number = 0;

  @Input()
  propertiesProfile: PropertyDTO[] = [];

  isHovered: boolean = false;
  propertiesComponent!: PropertyDTO[];

  faPlus = faPlus;
  faMinus = faMinus;
  constructor(
    private store: Store<AppState>,
    private renderer: Renderer2,
    private router: Router,
    private sharedService: SharedService
  ) {
    console.error(this.component);
    // this.store.select('properties').subscribe((data) => {
    //   if (data.loaded && this.component?.properties) {
    //     const propertiesFound = this.sharedService.getPropertiesById(
    //       data.properties,
    //       this.component.properties
    //     );
    //     if (propertiesFound) {
    //       this.propertiesComponent = this.sharedService.getPropertiesById(
    //         data.properties,
    //         this.component.properties
    //       );
    //       console.info(
    //         this.propertiesComponent,
    //         data.properties,
    //         this.component.properties
    //       );
    //     } else {
    //       console.warn('error');
    //       this.sharedService.managementToast(false, '¡Algo está fallando!');
    //       this.router.navigate(['components']);
    //     }
    //   }
    // });
  }
  ngOnInit(): void {
    //   this.component.properties = this.component.properties?.map((prop) =>
    //     this.propertiesProfile.find((p) => p.id === prop)
    //   );
    //   const phases = this.sharedService.getPhasesProfile();
    //   this.phase = phases.find((p) => p.id === this.component.phase_id);
  }
  onClick() {
    if (!this.fromFormulation) {
      this.router.navigate(['components', 'details', this.component.id]);
    }
  }

  onChangePercentage(event: any): void {
    event.stopPropagation();
    this.onPercentageChange.emit({
      component: this.component,
      percentage: this.percentage,
    });
  }

  increment(event: MouseEvent) {
    event.stopPropagation();
    this.percentage = this.percentage + 1;
    this.onPercentageChange.emit({
      component: this.component,
      percentage: this.percentage,
    });
  }

  decrement(event: MouseEvent) {
    event.stopPropagation();
    if (this.percentage > 0) {
      this.percentage = this.percentage - 1;
      this.onPercentageChange.emit({
        component: this.component,
        percentage: this.percentage,
      });
    }
  }
}
