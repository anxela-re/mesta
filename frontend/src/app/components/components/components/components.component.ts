import { Component, OnInit } from '@angular/core';
import { ComponentsService } from '../../services/components.service';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss'],
})
export class ComponentsComponent implements OnInit {
  constructor(private componentsService: ComponentsService) {}

  ngOnInit(): void {}

  getComponents(): void {
    console.info('getComponents');
    this.componentsService
      .getComponents()
      .subscribe((response) => console.info(response));
  }
}
