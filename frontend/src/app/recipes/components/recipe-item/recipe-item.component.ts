import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { props } from '@ngrx/store';
import { PropertyDTO } from 'src/app/properties/models/property.dto';
import { RecipeDTO } from '../../models/recipe.dto';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent implements OnInit, AfterViewInit {
  @ViewChild('borderTop') borderTopDOM!: ElementRef;
  @ViewChild('borderLeft') borderLeftDOM!: ElementRef;
  @ViewChild('borderRight') borderRightDOM!: ElementRef;
  @ViewChild('borderBottom') borderBottomDOM!: ElementRef;

  @HostListener('mouseover')
  onMouseOver() {
    this.isHovered = true;
    this.setBorder();
  }

  @HostListener('mouseout')
  onMouseOut() {
    this.isHovered = false;
    this.setBorder();
  }
  @Input()
  recipe!: RecipeDTO;

  @Input()
  properties: PropertyDTO[] = [];

  isHovered: boolean = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.setBorder();
  }

  ngAfterViewInit(): void {
      this.setBorder()
  }
  onClick(): void {
    console.info('onClick');
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
          this.isHovered
            ? `linear-gradient(${
                index === 1 || index === 3 ? `to bottom` : `to right`
              }, 
            #fff 33%,
            rgba(255, 255, 255, 0) 0%)`
            : `linear-gradient(${
                index === 1 || index === 3 ? `to bottom` : `to right`
              }, #0f172a 33%, rgba(255,255,255,0) 0%)`
        );
      }
    });
  }
}
