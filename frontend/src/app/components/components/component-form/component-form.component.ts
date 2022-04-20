import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { IBreacrumbHistory } from 'src/app/shared/components/breadcrumb/breadcrumb.component';
import { PhaseDTO } from 'src/app/user/models/phase.dto';
import { ComponentDTO } from '../../models/component.dto';
import { ComponentsService } from '../../services/components.service';
import { faPlus, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { PropertyDTO } from '../../models/property.dto';

@Component({
  selector: 'app-component-form',
  templateUrl: './component-form.component.html',
  styleUrls: ['./component-form.component.scss'],
})
export class ComponentFormComponent implements OnInit {
  componentId!: string | null;
  phases!: PhaseDTO[] | undefined;
  properties!: PropertyDTO[] | undefined;
  propertiesSelected: PropertyDTO[] = [];
  profile_id: number | undefined;

  component!: ComponentDTO;
  componentForm!: FormGroup;
  name!: FormControl;
  scientific_name!: FormControl;
  expiration_date!: FormControl;
  description!: FormControl;
  // image_url!: FormControl;
  phase_id!: FormControl;

  breacrumbHistory: IBreacrumbHistory[] = [];

  faPlus = faPlus;
  faPencil = faPencilAlt;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private fb: FormBuilder,
    private componentsService: ComponentsService
  ) {
    this.componentId = this.route.snapshot.paramMap.get('id');

    this.store.select('profiles').subscribe(({ profiles, selected }) => {
      if (selected) {
        this.phases = profiles?.find((p) => p.id === selected)?.phases;
        this.profile_id = selected;
      }
    });
  }

  ngOnInit(): void {
    if (this.componentId) {
      this.componentsService
        .getComponents({
          id: this.componentId,
        })
        .subscribe((response) => {
          this.component = new ComponentDTO(response.item);
          this.breacrumbHistory = [
            {
              name: 'Components',
              navigateName: 'components',
            },
            {
              name: this.component.name,
            },
          ];
        });
    } else {
      this.component = new ComponentDTO({
        profile_id: this.profile_id,
      });
      this.breacrumbHistory = [
        {
          name: 'Components',
          navigateName: 'components',
        },
        {
          name: 'Nuevo componente',
        },
      ];
    }
    this.name = new FormControl(this.component.name, [
      Validators.required,
      Validators.maxLength(64),
    ]);
    this.scientific_name = new FormControl(this.component.scientific_name, );
    this.description = new FormControl(this.component.description);
    this.expiration_date = new FormControl(this.component.expiration_date);
    this.phase_id = new FormControl(this.component.phase_id, [
      Validators.required,
    ]);

    this.componentForm = this.fb.group({
      name: this.name,
      scientific_name: this.scientific_name,
      description: this.description,
      phase_id: this.phase_id,
      expiration_date: this.expiration_date
    });
  }

  selectPhase(phase: PhaseDTO): void {
    this.componentForm.patchValue({ phase_id: phase.id });
  }

  updateProperties(properties: PropertyDTO[]) {
    this.propertiesSelected = properties;
  }

  onSubmit(): void {
    console.info(this.componentForm.value);
    console.info(this.componentForm);

    if (this.componentForm.invalid) {
      return;
    }

    this.component = {
      ...this.component,
      ...this.componentForm.value,
      properties: this.propertiesSelected.map(({ id }) => id),
    };

    console.info(this.component)

    if (this.componentId) {
      console.info('you are updating');
    } else {
      this.componentsService.createComponent(this.component).subscribe(
        (response) => console.info(response),
        (error) => console.info(error)
      );
    }
  }
}
