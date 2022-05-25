import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit {
  @ViewChild('popup') popup!: ElementRef;
  @ViewChild('title') title!: ElementRef;
  @ViewChild('content') content!: ElementRef;
  @Input() id!: string;

  @Output()
  onProceed: EventEmitter<boolean> = new EventEmitter();

  private element: any;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;

    this.modalService.addModal(this);
  }

  ngOnInit(): void {
    if (!this.id) {
      return;
    }
  }
  ngOnDestroy(): void {
    this.modalService.removeModal(this.id);
    this.element.remove();
  }

  // open modal
  open(title: string, content: string): void {
    this.element.style.display = 'block';
    this.popup.nativeElement.className =
      this.popup.nativeElement.className.replace('invisible', 'visible');
    this.popup.nativeElement.className =
      this.popup.nativeElement.className.replace('opacity-0', 'opacity-1');
    this.title.nativeElement.textContent = title;
    this.content.nativeElement.textContent = content;
  }

  // close modal
  close(proceed: boolean = false): void {
    this.element.style.display = 'none';
    this.popup.nativeElement.className =
      this.popup.nativeElement.className.replace('visible', 'invisible');
    this.popup.nativeElement.className =
      this.popup.nativeElement.className.replace('opacity-1', 'opacity-0');
    this.title.nativeElement.textContent = '';
    this.content.nativeElement.textContent = '';
    if(proceed) {
      this.onProceed.emit(true);
    }
  }
}
