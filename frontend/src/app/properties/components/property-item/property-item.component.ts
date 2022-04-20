import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PropertyDTO } from '../../models/property.dto';
import { faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { PropertiesService } from '../../services/properties.service';

export interface OnSelectProps {
  property: PropertyDTO;
  selected: boolean;
}

@Component({
  selector: 'app-property-item',
  templateUrl: './property-item.component.html',
  styleUrls: ['./property-item.component.scss'],
})
export class PropertyItemComponent implements OnInit {
  @Input()
  property!: PropertyDTO;
  @Input()
  selected: boolean = false;
  @Input()
  editing: boolean = false;
  @Output()
  onSelect: EventEmitter<OnSelectProps> = new EventEmitter();
  @Output()
  onRemoved: EventEmitter<any> = new EventEmitter();

  propertyEdited: string | undefined;

  edited: boolean = false;
  faSave = faSave;
  faTrash = faTrashAlt;
  constructor(private propertiesService: PropertiesService) {}

  ngOnInit(): void {
    if (this.property) {
      this.propertyEdited = this.property.name;
    } else {
      this.propertyEdited = '';
    }
  }

  select(): void {
    console.info('select');
    if (this.property && !this.editing) {
      this.selected = !this.selected;
      this.onSelect.emit({
        property: this.property,
        selected: this.selected,
      });
    }
  }

  onPropertyChange(event: any): void {
    console.info(event);
    this.edited = true;
    if (event?.target?.textContent) {
      this.propertyEdited = event?.target?.textContent;
    }
  }
  onSaveEdition(event: MouseEvent): void {
    event.stopPropagation();
    if (this.edited) {
      this.propertiesService
        .updateProperty({
          ...this.property,
          name: this.propertyEdited,
        })
        .subscribe((data) => (this.edited = false));
    }
  }
  onDeleteProperty(event: MouseEvent): void {
    event.stopPropagation();
    if (this.editing) {
      console.info('deleting', this.editing);
      this.propertiesService
        .deleteProperty(this.property)
        .subscribe((d) => this.onRemoved.emit());
    }
  }
}
