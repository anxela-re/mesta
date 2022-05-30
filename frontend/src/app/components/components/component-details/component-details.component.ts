import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { PropertyDTO } from 'src/app/properties/models/property.dto';
import { IBreadcrumbHistory } from 'src/app/shared/components/breadcrumb/breadcrumb.component';
import { PhaseDTO } from 'src/app/phases/models/phase.dto';
import { ComponentDTO } from '../../models/component.dto';
import { ComponentsService } from '../../services/components.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { finalize } from 'rxjs/operators';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-component-details',
  templateUrl: './component-details.component.html',
})
export class ComponentDetailsComponent implements OnInit {
  id!: number;
  component!: ComponentDTO;
  phase: PhaseDTO | undefined;
  phases!: PhaseDTO[] | undefined;
  profile_id!: number | undefined;
  propertiesProfile: PropertyDTO[] = [];
  properties: PropertyDTO[] = [];

  breadcrumbHistory: IBreadcrumbHistory[] = [];

  constructor(
    private route: ActivatedRoute,
    private componentsService: ComponentsService,
    private router: Router,
    private store: Store<AppState>,
    private modalService: ModalService,
    private loadingService: LoadingService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = parseInt(id);
    }

    this.store.select('phases').subscribe(({ phases, loaded }) => {
      if (loaded) {
        this.phases = phases;
        this.updatePhase();
      }
    });

    this.store.select('properties').subscribe(({ properties, loaded }) => {
      if (loaded) {
        this.propertiesProfile = properties;
        this.updateProperties();
      }
    });
  }

  ngOnInit(): void {
    this.loadingService.showLoading('component_detils_getComponents');
    this.componentsService
      .getComponents({ id: this.id })
      .pipe(
        finalize(() =>
          this.loadingService.hideLoading('component_detils_getComponents')
        )
      )
      .subscribe(
        (data) => {
          if(data.length === 0) {
            this.router.navigate(['components'])
            return;
          }
          this.component = data[0];

          this.updatePhase();
          this.updateProperties();
          this.breadcrumbHistory = [
            {
              name: 'Components',
              navigateName: 'components',
            },
            {
              name: this.component.name,
            },
          ];
        },
        () => this.router.navigate(['components'])
      );
  }

  getIdModal(): string {
    return 'component-delete-' + this.component?.id;
  }
  updatePhase() {
    if (this.component && this.phases) {
      this.phase = this.phases?.find((p) => p.id === this.component.phase_id);
    }
  }

  updateProperties() {
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

  edit(): void {
    this.router.navigate(['components', 'edit', this.component.id]);
  }

  delete(): void {
    this.modalService.openModal(
      this.getIdModal(),
      '¡Cuidado!',
      'También será eliminado el componente de las recetas que lo utilicen ¿Está seguro de que quiere borrar este componente?'
    );
  }

  deleteComponentConfirm(): void {
    if (!this.component.id) {
      return;
    }
    this.loadingService.showLoading('component_detils_deleteComponent');
    this.componentsService
      .deleteComponent(this.component.id)
      .pipe(
        finalize(() =>
          this.loadingService.hideLoading('component_detils_deleteComponent')
        )
      )
      .subscribe(() => this.router.navigate(['components']));
  }
}
