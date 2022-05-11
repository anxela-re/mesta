import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { IComponentPercentage } from 'src/app/recipes/models/recipe.dto';
import { PhaseDTO } from 'src/app/phases/models/phase.dto';
import { ComponentDTO } from '../../models/component.dto';
import { PropertyDTO } from 'src/app/properties/models/property.dto';
import { SharedService } from 'src/app/shared/services/shared.service';

export interface IChangePercentage {
  component: ComponentDTO;
  percentage: number;
}
export function maxAddition(value: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const suma = control.value.reduce(
      (acc: number, curr: any) => acc + curr?.percentage,
      0
    );
    return suma <= value ? null : { maxAddition: true };
  };
}
@Component({
  selector: 'app-components-phase',
  templateUrl: './components-phase.component.html',
  styleUrls: ['./components-phase.component.scss'],
})
export class ComponentsPhaseComponent implements OnInit, OnChanges {
  @ViewChild('bodyAccordion') bodyAccordioDOM!: ElementRef;

  @Input()
  properties!: PropertyDTO[] | null;

  @Input()
  phase!: PhaseDTO;

  @Input()
  components!: ComponentDTO[];

  @Input()
  fromFormulation: boolean = false;

  @Input()
  fromRecipeDetails: boolean = false;

  @Input()
  percentage: number = 0;

  @Input()
  componentArrayControl!: FormArray;

  @Input()
  recipeComponents: IComponentPercentage[] = [];

  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;

  open: boolean = false;

  phaseComponentsForm!: FormArray;

  bodyAccordionHeight!: number;

  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    if (this.fromFormulation || this.fromRecipeDetails) {
      this.initForm();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.percentage) {
      this.initForm();
      this.phaseComponentsForm.reset();
    }
    if (changes.components || changes.componentArrayControl) {
      this.initForm();
    }
  }

  initForm(): void {
    this.phaseComponentsForm = this.fb.array(
      this.recipeComponents
        .map(({ component_id, percentage }) => ({
          component: this.components.find(({ id }) => id === component_id),
          percentage,
        }))
        .filter(({ component }) => component?.phase_id === this.phase.id)
        .map(({ component, percentage }) => {
          return this.fb.group({
            component: component,
            percentage,
          });
        }),
      maxAddition(this.percentage)
    );
  }

  changeArrayControl(
    { percentage, component }: IChangePercentage,
    formArray: FormArray
  ): void {
    const found = formArray.value.find(
      (v: any) => v.component?.id === component.id
    );
    if (found) {
      const index = formArray.value.indexOf(found);
      if (percentage === 0) {
        formArray.removeAt(index);
      } else {
        console.info('cc', percentage)
        formArray
          .at(index)
          .patchValue({ component: found.component, percentage: percentage });
      }
    } else {
      formArray.push(this.fb.group({ component, percentage }));
    }

    console.info('bbb', formArray.value);
  }
  onPercentageChange({ percentage, component }: IChangePercentage) {
    this.changeArrayControl(
      { percentage, component },
      this.phaseComponentsForm
    );
    this.changeArrayControl(
      { percentage, component },
      this.componentArrayControl
    );
  }

  getPercentageByComponentId(componentId: number | undefined): number {
    if (componentId) {
      const found = this.phaseComponentsForm.value.find(
        (v: any) => v.component?.id === componentId
      );
      return found && found.percentage ? found.percentage : 0;
    }
    return 0;
  }

  onCollapsing(): void {
    if (this.bodyAccordioDOM.nativeElement) {
      if (!this.bodyAccordionHeight) {
        this.bodyAccordionHeight =
          this.bodyAccordioDOM.nativeElement.clientHeight;
      }
      this.open = !this.open;
      this.renderer.setStyle(
        this.bodyAccordioDOM.nativeElement,
        'height',
        this.open ? `${this.bodyAccordionHeight}px` : 0
      );
    }
  }
  getPropertiesByComponent(propertiesId: number[]): PropertyDTO[] | null {
    if (this.properties) {
      return this.sharedService.getPropertiesById(
        this.properties,
        propertiesId
      );
    } else {
      return null;
    }
  }
}
