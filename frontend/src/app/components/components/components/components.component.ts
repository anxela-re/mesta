import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import {
  faChevronDown,
  faChevronUp,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { merge, Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { IPhasesPercentage } from 'src/app/compositions/models/composition.dto';
import { IComponentPercentage } from 'src/app/recipes/models/recipe.dto';
import { PhaseDTO } from 'src/app/user/models/phase.dto';
import { ProfileSelectedService } from 'src/app/user/services/profile-selected.service';
import { ComponentDTO } from '../../models/component.dto';
import { ComponentsService } from '../../services/components.service';
export interface ISelectProp {
  selected: boolean;
  component: ComponentDTO;
}
@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss'],
})
export class ComponentsComponent implements OnInit {
  @Input()
  fromFormulation: boolean = false;

  @Output()
  onSelectComponent: EventEmitter<ComponentDTO[]> = new EventEmitter();

  @Input()
  phasesPercentage: IPhasesPercentage[] | undefined = [];

  @Input()
  componentArrayControl!: FormArray;

  @Input()
  recipeComponents: IComponentPercentage[] = [];

  phases: PhaseDTO[] | undefined;

  components$: Observable<ComponentDTO[]> | undefined;
  components: ComponentDTO[] = [];
  selectedComponents: ComponentDTO[] = [];
  searchTerm: string = '';

  private searchSubject: Subject<string> = new Subject();
  private reloadList: Subject<any> = new Subject();

  faPlus = faPlus;

  constructor(
    private componentsService: ComponentsService,
    private router: Router,
    private store: Store<AppState>,
    private profileSelectedService: ProfileSelectedService
  ) {
    this.store.select('profiles').subscribe((profilesState) => {
      if (profilesState.loaded && profilesState.selected) {
        this.phases = this.profileSelectedService.getProfileSelected()?.phases;
      }
    });
  }

  ngOnInit(): void {
    this.components$ = merge(
      this.reloadList.pipe(
        switchMap(() => this.componentsService.getComponents())
      ),
      this.searchSubject.pipe(
        startWith(this.searchTerm),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(() =>
          this.componentsService.getComponents({
            name: `%${this.searchTerm}%`,
            select: ['name', 'properties', 'profile_id', 'phase_id', 'id'],
          })
        )
      )
    );
    this.components$.subscribe((data) => (this.components = data));
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
}
