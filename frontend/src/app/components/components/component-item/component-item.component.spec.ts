import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PhaseDTO } from 'src/app/phases/models/phase.dto';
import { PropertyDTO } from 'src/app/properties/models/property.dto';
import { ComponentDTO } from '../../models/component.dto';

import { ComponentItemComponent } from './component-item.component';

describe('ComponentItemComponent', () => {
  let component: ComponentItemComponent;
  let fixture: ComponentFixture<ComponentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComponentItemComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentItemComponent);
    component = fixture.componentInstance;
    component.phase = new PhaseDTO({
      id: 1,
      profile_id: 1,
      name: 'phase',
      color: '#fff',
      description: 'phase',
    });
    component.component = new ComponentDTO();
    component.properties = [new PropertyDTO()];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
