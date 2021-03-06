import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html'
})
export class FeedbackComponent implements OnInit {
  @ViewChild('content') content!: ElementRef;
  @ViewChild('toast') toast!: ElementRef;

  private element: any;

  constructor(private toastService: ToastService, private el: ElementRef) {
    this.element = this.el.nativeElement;
    this.element.style.display = 'none';

    this.toastService.addToast(this);
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.toastService.removeToast();
    this.element.remove();
  }

  getToast(): any {
    return this.element;
  }

  show(content: string, success: boolean): void {
    const toastEl = this.toast.nativeElement;
    this.element.style.display = 'flex';
    toastEl.className = toastEl.className.replace(
      '-translate-y-full',
      'transform-none'
    );
    toastEl.className = toastEl.className.replace('p-0', 'p-2');
    if (success) {
      toastEl.className = toastEl.className.replace('bg-danger', '');
      toastEl.className = toastEl.className.concat(' bg-success');
    } else {
      toastEl.className = toastEl.className.replace('bg-success', '');
      toastEl.className = toastEl.className.concat(' bg-danger');
    }
    this.content.nativeElement.textContent = content;
  }

  hide(): void {
    const toastEl = this.toast.nativeElement;
    this.element.style.display = 'none';
    this.content.nativeElement.textContent = '';
    toastEl.className = toastEl.className.replace(
      'transform-none',
      '-translate-y-full'
    );
    toastEl.className = toastEl.className.replace('p-2', 'p-0');
    toastEl.className = toastEl.className.replace('bg-success', '');
    toastEl.className = toastEl.className.replace('bg-danger', '');
  }
}
