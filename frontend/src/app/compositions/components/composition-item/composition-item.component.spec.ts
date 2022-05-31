import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CompositionDTO } from '../../models/composition.dto';

import { CompositionItemComponent } from './composition-item.component';

describe('CompositionItemComponent', () => {
  let component: CompositionItemComponent;
  let fixture: ComponentFixture<CompositionItemComponent>;
  let initialState: any;
  let storeMock: MockStore;

  beforeEach(async () => {
    localStorage.setItem('access_token', 'access_token');
    localStorage.setItem('user_id', '1');
    localStorage.setItem('selected_profile', '1');
    initialState = {};

    await TestBed.configureTestingModule({
      declarations: [CompositionItemComponent],
      imports: [FormsModule],
      providers: [
        provideMockStore({ initialState }),
      ],
    }).compileComponents();
    storeMock = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompositionItemComponent);
    component = fixture.componentInstance;
    component.composition = new CompositionDTO();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
