import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  faGrinTongueSquint,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { PropertyDTO } from 'src/app/properties/models/property.dto';
import { PhaseDTO } from 'src/app/user/models/phase.dto';
import { ProfileSelectedService } from 'src/app/user/services/profile-selected.service';
import { ComponentDTO } from '../../models/component.dto';
import { IChangePercentage } from '../components-phase/components-phase.component';
import { ISelectProp } from '../components/components.component';

@Component({
  selector: 'app-component-item',
  templateUrl: './component-item.component.html',
  styleUrls: ['./component-item.component.scss'],
})
export class ComponentItemComponent implements OnInit, AfterViewInit {
  @ViewChild('borderTop') borderTopDOM!: ElementRef;
  @ViewChild('borderLeft') borderLeftDOM!: ElementRef;
  @ViewChild('borderRight') borderRightDOM!: ElementRef;
  @ViewChild('borderBottom') borderBottomDOM!: ElementRef;
  @ViewChild('container') containerDOM!: ElementRef;

  @HostListener('mouseover')
  onMouseOver() {
    this.isHovered = true;
    this.setBorder();
    this.setContainerStyle();
  }

  @HostListener('mouseout')
  onMouseOut() {
    this.isHovered = false;
    this.setBorder();
    this.setContainerStyle();
  }

  @Input()
  component: ComponentDTO = new ComponentDTO();

  @Input()
  fromFormulation: boolean = false;

  @Input()
  fromRecipeDetails: boolean = false;

  @Output()
  onPercentageChange: EventEmitter<IChangePercentage> = new EventEmitter();

  @Input()
  percentage: number = 0;

  isHovered: boolean = false;

  phase?: PhaseDTO;

  propertiesProfile: PropertyDTO[] = [];

  faPlus = faPlus;
  faMinus = faMinus;
  constructor(
    private store: Store<AppState>,
    private profileSelectedService: ProfileSelectedService,
    private renderer: Renderer2,
    private router: Router
  ) {
    this.store.select('properties').subscribe((data) => {
      if (data.loaded) {
        this.propertiesProfile = data.properties;
      }
    });
  }
  ngOnInit(): void {
    this.component.properties = this.component.properties?.map((prop) =>
      this.propertiesProfile.find((p) => p.id === prop)
    );

    const profile = this.profileSelectedService.getProfileSelected();

    this.phase = profile?.phases?.find(
      (phase) => phase.id === this.component.phase_id
    );

    this.setBorder();
  }

  ngAfterViewInit(): void {
    this.setBorder();
  }

  setContainerStyle(): void {
    if (this.containerDOM) {
      this.renderer.setStyle(
        this.containerDOM.nativeElement,
        'background-color',
        this.isHovered || this.percentage > 0
          ? this.phase?.color || '#0f172a'
          : 'transparent'
      );
    }
  }
  setBorder(): void {
    const listBorders = [
      this.borderTopDOM,
      this.borderRightDOM,
      this.borderBottomDOM,
      this.borderLeftDOM,
    ];
    listBorders.forEach((el: ElementRef, index) => {
      if (el?.nativeElement) {
        this.renderer.setStyle(
          el.nativeElement,
          'background-image',
          this.isHovered || this.percentage > 0
            ? `linear-gradient(${
                index === 1 || index === 3 ? `to bottom` : `to right`
              }, 
            #fff 33%,
            rgba(255, 255, 255, 0) 0%)`
            : `linear-gradient(${
                index === 1 || index === 3 ? `to bottom` : `to right`
              }, ${this.phase?.color || '#0f172a'} 33%, rgba(255,255,255,0) 0%)`
        );
      }
    });
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
