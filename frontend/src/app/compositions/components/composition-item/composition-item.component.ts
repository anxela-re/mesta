import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { CompositionDTO } from '../../models/composition.dto';
import * as compositionsActions from '../../actions';
import { SharedService } from 'src/app/shared/services/shared.service';

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
  constructor(
    private store: Store<AppState>,
    private sharedService: SharedService
  ) {}

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

  warningDeleteComposition(): void {
    this.sharedService;
  }
  deleteComposition(event: MouseEvent): void {
    event?.stopPropagation();
    //TODO compositions delete warning -> deleting recipes
    this.sharedService.manageModal(
      '¡Cuidado!',
      'Si elimina una composición, todas las recetas que la utilizan serán eliminadas, ¿Desea continuar de todas formas?',
      true,
      this.deleteCompositionConfirm
    );
  }
  deleteCompositionConfirm(): void {
    console.info('deleteCompositionConfirm')
    this.sharedService.manageModal('','',false);
    console.info(this.composition)
    if (
      this.composition &&
      this.composition?.id &&
      this.composition?.profile_id
    ) {
      // this.store.dispatch(
      //   compositionsActions.deleteComposition({
      //     compositionId: this.composition.id,
      //     profile_id: this.composition.profile_id,
      //   })
      // );
    }
  }
}
