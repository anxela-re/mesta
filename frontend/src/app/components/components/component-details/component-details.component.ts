import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faImage,
  faPencilAlt,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { PropertyDTO } from 'src/app/properties/models/property.dto';
import { IBreadcrumbHistory } from 'src/app/shared/components/breadcrumb/breadcrumb.component';
import { SharedService } from 'src/app/shared/services/shared.service';
import { PhaseDTO } from 'src/app/phases/models/phase.dto';
import { ComponentDTO } from '../../models/component.dto';
import { ComponentsService } from '../../services/components.service';

@Component({
  selector: 'app-component-details',
  templateUrl: './component-details.component.html',
  styleUrls: ['./component-details.component.scss'],
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

  faImage = faImage;
  faPencil = faPencilAlt;
  faTrash = faTrashAlt;
  constructor(
    private route: ActivatedRoute,
    private componentsService: ComponentsService,
    private router: Router,
    private store: Store<AppState>,
    private sharedService: SharedService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = parseInt(id);
    } else {
      this.router.navigate(['components']);
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
    this.componentsService.getComponents({ id: this.id }).subscribe(
      (data) => {
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
      (error) => this.router.navigate(['components'])
    );
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

  remove(): void {
    if (this.component.id) {
      this.componentsService
        .deleteComponent(this.component.id)
        .subscribe((data) => this.router.navigate(['components']));
    }
  }
}
