import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit, OnDestroy {
  private element: any;

  constructor(private el: ElementRef, private loadingService: LoadingService) {
    this.element = this.el.nativeElement;
    this.element.style.display = 'none';

    this.loadingService.addLoading(this);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
      this.loadingService.removeLoading();
      this.element.remove();
  }

  show(): void {
    this.element.style.display = 'block';
  }

  hide(): void {
    this.element.style.display = 'none';
  }
}
