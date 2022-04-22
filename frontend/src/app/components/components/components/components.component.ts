import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';
import { ComponentDTO } from '../../models/component.dto';
import { ComponentsService } from '../../services/components.service';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss'],
})
export class ComponentsComponent implements OnInit {

  public components$: Observable<ComponentDTO[]> | undefined;
  public searchTerm: string = '';

  private searchSubject: Subject<string> = new Subject();
  private reloadList: Subject<any> = new Subject();

  constructor(
    private componentsService: ComponentsService,
    private router: Router
  ) {}

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
    this.router.navigate(['/components','new']);
  }
  editComponent(componentId: number | undefined): void {
    if (componentId) {
      this.router.navigate(['/edit', componentId]);
    }
  }
}
