import { Component, OnInit } from '@angular/core';
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
import { PhaseDTO } from 'src/app/user/models/phase.dto';
import { ProfileSelectedService } from 'src/app/user/services/profile-selected.service';
import { ComponentDTO } from '../../models/component.dto';
import { ComponentsService } from '../../services/components.service';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss'],
})
export class ComponentsComponent implements OnInit {
  phases: PhaseDTO[] | undefined;

  public components$: Observable<ComponentDTO[]> | undefined;
  public searchTerm: string = '';

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
          })
        )
      )
    );
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
}
