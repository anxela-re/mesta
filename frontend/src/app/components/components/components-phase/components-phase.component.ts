import { Component, Input, OnInit } from '@angular/core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { PhaseDTO } from 'src/app/user/models/phase.dto';
import { ComponentDTO } from '../../models/component.dto';

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

  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;

  open: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}