import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsPhaseComponent } from './components-phase.component';

describe('ComponentsPhaseComponent', () => {
  let component: ComponentsPhaseComponent;
  let fixture: ComponentFixture<ComponentsPhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentsPhaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
