import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { PhaseDTO } from 'src/app/user/models/phase.dto';
import { ComponentDTO } from '../../models/component.dto';
import { ISelectProp } from '../components/components.component';

@Component({
  selector: 'app-components-phase',
  templateUrl: './components-phase.component.html',
  styleUrls: ['./components-phase.component.scss'],
})
export class ComponentsPhaseComponent implements OnInit {
  @Input()
  phase: PhaseDTO | undefined;

  @Input()
  components: ComponentDTO[] = [];

  @Input()
  selectedComponents: ComponentDTO[] = [];

  @Output()
  onSelectComponent: EventEmitter<ISelectProp> = new EventEmitter();

  @Input()
  fromFormulation: boolean = false;

  @Input()
  percentage: number | undefined = undefined;

  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;

  open: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  isSelected(component: ComponentDTO): boolean {
    return (
      this.selectedComponents.find((c) => c.id === component.id) !== undefined
    );
  }
}
