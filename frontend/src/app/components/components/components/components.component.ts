import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentsService } from '../../services/components.service';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss'],
})
export class ComponentsComponent implements OnInit {
  constructor(
    private componentsService: ComponentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getComponents();
  }

  getComponents(): void {
    console.info('getComponents');
    this.componentsService
      .getComponents()
      .subscribe((response) => console.info(response));
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
