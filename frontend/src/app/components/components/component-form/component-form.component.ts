import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { IBreadcrumbHistory } from 'src/app/shared/components/breadcrumb/breadcrumb.component';
import { PhaseDTO } from 'src/app/phases/models/phase.dto';
import { ComponentDTO } from '../../models/component.dto';
import { ComponentsService } from '../../services/components.service';
import { PropertyDTO } from '../../../properties/models/property.dto';
import { ProfileSelectedService } from 'src/app/profiles/services/profile-selected.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { finalize } from 'rxjs/operators';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-component-form',
  templateUrl: './component-form.component.html',
})
export class ComponentFormComponent implements OnInit {
  componentId!: string | null;
  phases!: PhaseDTO[] | undefined;
  properties: PropertyDTO[] = [];
  propertiesProfile!: PropertyDTO[];
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

  breadcrumbHistory: IBreadcrumbHistory[] = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private fb: FormBuilder,
    private componentsService: ComponentsService,
    private router: Router,
    private profileSelectedService: ProfileSelectedService,
    private loadingService: LoadingService,
    private toastService: ToastService
  ) {
    this.componentId = this.route.snapshot.paramMap.get('id');

    this.store.select('phases').subscribe(({ phases, loaded }) => {
      if (loaded) {
        this.phases = phases;
      }
    });

    this.store.select('properties').subscribe(({ properties, loaded }) => {
      if (loaded && this.propertiesProfile !== properties) {
        this.propertiesProfile = properties;
      }
    });

    this.profile_id = this.profileSelectedService.getProfileSelectedStored();
  }

  ngOnInit(): void {
    if (this.componentId) {
      this.loadingService.showLoading('component_form_getComponents');
      this.componentsService
        .getComponents({
          id: this.componentId,
        })
        .pipe(
          finalize(() =>
            this.loadingService.hideLoading('component_form_getComponents')
          )
        )
        .subscribe((response) => {
          if(response.length === 0) {
            this.router.navigate(['components']);
            return;
          }
          this.component = new ComponentDTO(response[0]);
          this.breadcrumbHistory = [
            {
              name: 'Components',
              navigateName: 'components',
            },
            {
              name: this.component.name,
            },
          ];
          this.initForm();
        });
    } else {
      this.component = new ComponentDTO({
        profile_id: this.profile_id,
      });
      this.breadcrumbHistory = [
        {
          name: 'Components',
          navigateName: 'components',
        },
        {
          name: 'Nuevo componente',
        },
      ];
      this.initForm();
    }
  }
  setProperties() {
    if (this.component?.properties && this.propertiesProfile !== undefined) {
      const props: PropertyDTO[] = [];
      this.component.properties.forEach((p) => {
        const propFound = this.propertiesProfile?.find((prop) => prop.id === p);
        if (propFound) {
          props.push(propFound);
        }
      });
      this.properties = props;
    }
  }

  initForm() {
    if (this.component) {
      this.name = new FormControl(this.component.name, [
        Validators.required,
        Validators.maxLength(64),
      ]);
      this.scientific_name = new FormControl(this.component.scientific_name);
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
        expiration_date: this.expiration_date,
      });
      this.setProperties();

      const props: PropertyDTO[] = [];
      this.component.properties?.forEach((p) => {
        const found = this.properties?.find(
          (prop: PropertyDTO) => prop.id === p
        );
        if (found) {
          props.push(found);
        }
      });

      this.updateProperties(props);
    }
  }

  selectPhase(phase: PhaseDTO): void {
    this.componentForm.patchValue({ phase_id: phase.id });
  }

  updateProperties(properties: PropertyDTO[]) {
    this.propertiesSelected = properties;
  }

  onSubmit(): void {
    if (this.componentForm.invalid) {
      return;
    }
    this.component = {
      ...this.component,
      ...this.componentForm.value,
      properties: this.propertiesSelected.map(({ id }) => id),
    };

    if (this.componentId) {
      this.loadingService.showLoading('component_form_updateComponent');
      this.componentsService
        .updateComponent(this.component)
        .pipe(
          finalize(() =>
            this.loadingService.hideLoading('component_form_updateComponent')
          )
        )
        .subscribe(
          () => this.router.navigate(['components']),
          (error) => {
            console.error(error);
            this.toastService.showToast(false, '??Algo est?? fallando!');
          }
        );
    } else {
      this.loadingService.showLoading('component_form_createComponent');
      this.componentsService
        .createComponent(this.component)
        .pipe(
          finalize(() =>
            this.loadingService.hideLoading('component_form_createComponent')
          )
        )
        .subscribe(
          () => this.router.navigate(['components']),
          (error) => {
            console.info(error);
            this.toastService.showToast(false, '??Algo est?? fallando!');
          }
        );
    }
  }
}
