import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { CompositionDTO } from '../../models/composition.dto';
import * as compositionsActions from '../../actions';

@Component({
  selector: 'app-composition-item',
  templateUrl: './composition-item.component.html',
  styleUrls: ['./composition-item.component.scss'],
})
export class CompositionItemComponent implements OnInit {
  @Input()
  composition!: CompositionDTO;

  @Input()
  selected: boolean = false;

  @Input()
  editing: boolean = false;

  @Output()
  onSelect: EventEmitter<CompositionDTO> = new EventEmitter();

  faTrash = faTrashAlt;
  editionMode: boolean = false;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  onSelecting(): void {
    if (this.composition) {
      if (this.editing) {
        this.editionMode = true;
      } else {
        this.onSelect.emit(this.composition);
      }
    }
  }

  deleteComposition(event: MouseEvent): void {
    event?.stopPropagation();
    if (this.composition && this.composition.id) {
      this.store.dispatch(
        compositionsActions.deleteComposition({
          compositionId: this.composition.id,
        })
      );
    }
  }
}
