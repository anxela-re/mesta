import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashedBoxComponent } from './dashed-box.component';

describe('DashedBoxComponent', () => {
  let component: DashedBoxComponent;
  let fixture: ComponentFixture<DashedBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashedBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashedBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
