import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ComponentDTO } from 'src/app/components/models/component.dto';
import { PhaseDTO } from 'src/app/phases/models/phase.dto';

@Component({
  selector: 'app-component-container',
  templateUrl: './component-container.component.html',
  styleUrls: ['./component-container.component.scss'],
})
export class ComponentContainerComponent implements OnInit, AfterViewInit {
  @ViewChild('borderTop') borderTopDOM!: ElementRef;
  @ViewChild('borderLeft') borderLeftDOM!: ElementRef;
  @ViewChild('borderRight') borderRightDOM!: ElementRef;
  @ViewChild('borderBottom') borderBottomDOM!: ElementRef;
  @ViewChild('container') containerDOM!: ElementRef;

  @HostListener('mouseover')
  onMouseOver() {
    this.isHovered = true;
    this.setBorder();
    this.setContainerStyle();
  }

  @HostListener('mouseout')
  onMouseOut() {
    this.isHovered = false;
    this.setBorder();
    this.setContainerStyle();
  }

  @Input()
  percentage: number = 0;

  @Input()
  phase: PhaseDTO | undefined;

  @Input()
  component: ComponentDTO | undefined;

  isHovered: boolean = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setBorder();
    this.setContainerStyle();
  }
  setContainerStyle(): void {
    if (this.containerDOM) {
      this.renderer.setStyle(
        this.containerDOM.nativeElement,
        'background-color',
        this.isHovered || this.percentage > 0
          ? this.phase?.color || '#0f172a'
          : 'transparent'
      );
    }
  }
  setBorder(): void {
    const listBorders = [
      this.borderTopDOM,
      this.borderRightDOM,
      this.borderBottomDOM,
      this.borderLeftDOM,
    ];
    listBorders.forEach((el: ElementRef, index) => {
      if (el?.nativeElement) {
        this.renderer.setStyle(
          el.nativeElement,
          'background-image',
          this.isHovered || this.percentage > 0
            ? `linear-gradient(${
                index === 1 || index === 3 ? `to bottom` : `to right`
              }, 
            #fff 33%,
            rgba(255, 255, 255, 0) 0%)`
            : `linear-gradient(${
                index === 1 || index === 3 ? `to bottom` : `to right`
              }, ${this.phase?.color || '#0f172a'} 33%, rgba(255,255,255,0) 0%)`
        );
      }
    });
  }

  onClick(): void {}
}
