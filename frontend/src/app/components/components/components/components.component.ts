import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { merge, Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { IPhasesPercentage } from 'src/app/compositions/models/composition.dto';
import { IComponentPercentage } from 'src/app/recipes/models/recipe.dto';
import { PhaseDTO } from 'src/app/phases/models/phase.dto';
import { ComponentDTO } from '../../models/component.dto';
import { ComponentsService } from '../../services/components.service';
import { Actions, ofType } from '@ngrx/effects';
import * as ProfilesActions from '../../../profiles/actions';
import { PropertyDTO } from 'src/app/properties/models/property.dto';

export interface ISelectProp {
  selected: boolean;
  component: ComponentDTO;
}
@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
})
export class ComponentsComponent implements OnInit, OnDestroy {
  @Input()
  fromFormulation: boolean = false;

  @Input()
  fromRecipeDetails: boolean = false;

  @Output()
  onSelectComponent: EventEmitter<ComponentDTO[]> = new EventEmitter();

  @Input()
  phasesPercentage: IPhasesPercentage[] | undefined = [];

  @Input()
  recipeComponentsArrayControl!: FormArray;

  @Input()
  recipeComponents: IComponentPercentage[] = [];

  phases!: PhaseDTO[];
  propertiesProfile!: PropertyDTO[];

  @Input()
  defaultQuery?: any;

  components$!: Observable<ComponentDTO[]>;
  components: ComponentDTO[] = [];
  selectedComponents: ComponentDTO[] = [];
  searchTerm: string = '';
  propertiesIdSelected: string = '';

  private searchSubject: Subject<string> = new Subject();
  private reloadList: Subject<any> = new Subject();

  faPlus = faPlus;
  faSearch = faSearch;

  private unsubscribe$ = new Subject<void>();
  constructor(
    private componentsService: ComponentsService,
    private router: Router,
    private store: Store<AppState>,
    private actions$: Actions
  ) {
    this.actions$
      .pipe(ofType(ProfilesActions.selectProfile), takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.reloadList.next();
      });
    this.store
      .select('phases')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({ phases, loaded }) => {
        if (loaded) {
          this.phases = phases;
        }
      });

    this.store
      .select('properties')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({ properties, loaded, filtered }) => {
        if (loaded && properties !== this.propertiesProfile) {
          this.propertiesProfile = properties;
        }
        if (filtered) {
          this.propertiesIdSelected = filtered.map((p) => p.id).join(',');
          this.reloadList.next();
        }
      });
  }

  ngOnInit(): void {
    this.components$ = merge(
      this.reloadList.pipe(
        switchMap(() =>
          this.componentsService.getComponentsByProfile({
            name: this.searchTerm,
            properties: this.propertiesIdSelected,
            select: ['name', 'properties', 'profile_id', 'phase_id', 'id'],
            ...this.defaultQuery,
          })
        )
      ),
      this.searchSubject.pipe(
        startWith(this.searchTerm),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(() => {
          return this.componentsService.getComponentsByProfile({
            name: this.searchTerm,
            properties: this.propertiesIdSelected,
            select: ['name', 'properties', 'profile_id', 'phase_id', 'id'],
            ...this.defaultQuery,
          });
        })
      )
    );
    this.components$.subscribe((data) => {
      this.components = data;
      if (this.fromFormulation) {
        this.recipeComponentsArrayControl.value.map((v: any) => {
          v.component = v.component
            ? v.component
            : this.components.find((c) => c.id === v.component_id);
          return v;
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  createComponent(): void {
    this.router.navigate(['/components', 'new']);
  }
  editComponent(componentId: number | undefined): void {
    if (componentId) {
      this.router.navigate(['/edit', componentId]);
    }
  }

  search() {
    this.searchSubject.next(this.searchTerm);
  }

  getPhasePercentage(phaseId: number | undefined): number {
    return (
      this.phasesPercentage?.find((p) => p.phase_id === phaseId)?.percentage ||
      0
    );
  }
  filterByPhase(phaseId: number | undefined): ComponentDTO[] {
    if (phaseId) {
      return this.components?.filter((comp) => comp.phase_id === phaseId) || [];
    } else {
      return [];
    }
  }

  selectComponents(event: ISelectProp): void {
    if (event.selected) {
      this.selectedComponents.push(event.component);
    } else {
      this.selectedComponents = this.selectedComponents.filter(
        (component) => component.id !== event.component.id
      );
    }
    this.onSelectComponent.emit(this.selectedComponents);
  }

  getProperties(): PropertyDTO[] | null {
    return this.propertiesProfile;
  }
}
