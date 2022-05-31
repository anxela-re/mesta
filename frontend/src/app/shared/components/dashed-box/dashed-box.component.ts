import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
@Component({
  selector: 'app-dashed-box',
  templateUrl: './dashed-box.component.html'
})
export class DashedBoxComponent implements OnInit {
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
  selected: boolean = false;

  @Input()
  color?: string = '#0f172a';

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
        this.isHovered || this.selected ? this.color : 'transparent'
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
          this.isHovered || this.selected
            ? `linear-gradient(${
                index === 1 || index === 3 ? `to bottom` : `to right`
              }, 
            ${
              localStorage.theme === 'dark' && this.color !== '#0f172a'
                ? '#0f172a'
                : '#fff'
            } 50%,
            rgba(255, 255, 255, 0) 0%)`
            : `linear-gradient(${
                index === 1 || index === 3 ? `to bottom` : `to right`
              }, ${this.color} 50%, rgba(255,255,255,0) 0%)`
        );
      }
    });
  }
}
