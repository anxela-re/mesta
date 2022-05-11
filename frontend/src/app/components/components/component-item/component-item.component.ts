import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { PropertyDTO } from 'src/app/properties/models/property.dto';
import { PhaseDTO } from 'src/app/phases/models/phase.dto';
import { ComponentDTO } from '../../models/component.dto';
import { IChangePercentage } from '../components-phase/components-phase.component';

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
  constructor(private router: Router) {}
  ngOnInit(): void {}
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
