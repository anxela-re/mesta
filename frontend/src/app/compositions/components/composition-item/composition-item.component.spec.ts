import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositionItemComponent } from './composition-item.component';

describe('CompositionItemComponent', () => {
  let component: CompositionItemComponent;
  let fixture: ComponentFixture<CompositionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompositionItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompositionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
