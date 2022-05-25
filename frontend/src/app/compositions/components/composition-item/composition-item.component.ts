import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { CompositionDTO } from '../../models/composition.dto';
import * as compositionsActions from '../../actions';
import { ModalService } from 'src/app/shared/services/modal.service';

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
  faPencil = faPencilAlt;
  editionMode: boolean = false;

  constructor(
    private store: Store<AppState>,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    if (!this.composition) {
      return;
    }
  }

  getIdModal(): string {
    return 'delete-composition-modal' + this.composition.id;
  }

  onSelecting(): void {
    if (this.composition) {
      this.onSelect.emit(this.composition);
    }
  }
  deleteComposition(event: MouseEvent): void {
    if (!this.composition.id) {
      return;
    }
    event?.stopPropagation();
    this.modalService.openModal(
      this.getIdModal(),
      '¡Cuidado!',
      'Si elimina una composición, todas las recetas que la utilizan serán eliminadas, ¿Desea continuar de todas formas?'
    );
  }
  deleteCompositionConfirm(): void {
    if (
      this.composition &&
      this.composition?.id &&
      this.composition?.profile_id
    ) {
      this.store.dispatch(
        compositionsActions.deleteComposition({
          compositionId: this.composition.id,
          profile_id: this.composition.profile_id,
        })
      )
    }
  }
}
