import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { CompositionDTO } from '../../models/composition.dto';

@Component({
  selector: 'app-compositions-list',
  templateUrl: './compositions-list.component.html',
  styleUrls: ['./compositions-list.component.scss'],
})
export class CompositionsListComponent implements OnInit {
  @Output()
  onSelect: EventEmitter<CompositionDTO> = new EventEmitter();

  @Input()
  selected!: number;

  compositions: CompositionDTO[] = [];
  faPlus = faPlus;

  isAdding: boolean = false;
  constructor(private store: Store<AppState>) {
    this.store.select('compositions').subscribe((compositionsState) => {
      if (compositionsState.loaded) {
        this.compositions = compositionsState.compositions || [];
      }
    });
  }

  ngOnInit(): void {
    if (this.selected) {
      this.onSelect.emit(this.compositions.find((c) => c.id === this.selected));
    }
  }
  onCreate(): void {
    this.isAdding = true;
  }
  onEndEdition(): void {
    this.isAdding = false;
  }
  isSelected(compositionId: number | undefined): boolean {
    return compositionId === this.selected;
  }
}
