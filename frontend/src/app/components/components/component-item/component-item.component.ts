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
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { PropertyDTO } from 'src/app/properties/models/property.dto';
import { PhaseDTO } from 'src/app/user/models/phase.dto';
import { ProfileSelectedService } from 'src/app/user/services/profile-selected.service';
import { ComponentDTO } from '../../models/component.dto';

@Component({
  selector: 'app-component-item',
  templateUrl: './component-item.component.html',
  styleUrls: ['./component-item.component.scss'],
})
export class ComponentItemComponent implements OnInit, AfterViewInit {
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
  component: ComponentDTO = new ComponentDTO();

  isHovered: boolean = false;

  phase?: PhaseDTO;

  propertiesProfile: PropertyDTO[] = [];

  constructor(
    private store: Store<AppState>,
    private profileSelectedService: ProfileSelectedService,
    private renderer: Renderer2,
    private router: Router
  ) {
    this.store.select('properties').subscribe((data) => {
      if (data.loaded) {
        this.propertiesProfile = data.properties;
      }
    });
  }
  ngOnInit(): void {
    this.component.properties = this.component.properties?.map((prop) =>
      this.propertiesProfile.find((p) => p.id === prop)
    );

    const profile = this.profileSelectedService.getProfileSelected();

    this.phase = profile?.phases?.find(
      (phase) => phase.id === this.component.phase_id
    );
    this.setBorder();
  }

  ngAfterViewInit(): void {
    this.setBorder();
  }

  setContainerStyle(): void {
    if (this.containerDOM) {
      this.renderer.setStyle(
        this.containerDOM.nativeElement,
        'background-color',
        this.isHovered ? this.phase?.color || '#0f172a' : 'transparent'
      );
    }
  }
  setBorder(): void {
    if (this.borderTopDOM) {
      this.renderer.setStyle(
        this.borderTopDOM.nativeElement,
        'background-image',
        this.isHovered
          ? `linear-gradient(to right, 
          #fff 33%,
          rgba(255, 255, 255, 0) 0%)`
          : `linear-gradient(to right, ${
              this.phase?.color || '#0f172a'
            } 33%, rgba(255,255,255,0) 0%)`
      );
    }

    if (this.borderBottomDOM) {
      this.renderer.setStyle(
        this.borderBottomDOM.nativeElement,
        'background-image',
        this.isHovered
          ? `linear-gradient(to right, 
          #fff 33%,
          rgba(255, 255, 255, 0) 0%)`
          : `linear-gradient(to right, ${
              this.phase?.color || '#0f172a'
            } 33%, rgba(255,255,255,0) 0%)`
      );
    }
    if (this.borderLeftDOM) {
      this.renderer.setStyle(
        this.borderLeftDOM.nativeElement,
        'background-image',
        this.isHovered
          ? `linear-gradient(#fff 33%, rgba(255, 255, 255, 0) 0%)`
          : `linear-gradient(to bottom, ${
              this.phase?.color || '#0f172a'
            } 33%, rgba(255,255,255,0) 0%)`
      );
    }
    if (this.borderRightDOM) {
      this.renderer.setStyle(
        this.borderRightDOM.nativeElement,
        'background-image',
        this.isHovered
          ? `linear-gradient(#fff 33%, rgba(255, 255, 255, 0) 0%)`
          : `linear-gradient(to bottom, ${
              this.phase?.color || '#0f172a'
            } 33%, rgba(255,255,255,0) 0%)`
      );
    }
  }

  onDetails() {
    // this.router.navigateByUrl(`components/${this.component.id}`)
    this.router.navigate(['components', 'details', this.component.id]);
  }
}
