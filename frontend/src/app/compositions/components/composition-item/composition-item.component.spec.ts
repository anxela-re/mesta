import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ModalService } from 'src/app/shared/services/modal.service';
import { CompositionDTO } from '../../models/composition.dto';

import { CompositionItemComponent } from './composition-item.component';

class modalClass {
  openModal = jasmine.createSpy('openModal');
  closeModal = jasmine.createSpy('closeModal');
  modals = [
    {
      id: 'modal',
      open: () => {},
      close: () => {},
    },
  ];
}
describe('CompositionItemComponent', () => {
  let component: CompositionItemComponent;
  let fixture: ComponentFixture<CompositionItemComponent>;
  let initialState: any;
  let storeMock: MockStore;
  let modalService: ModalService;

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
        { provide: ModalService, useClass: modalClass },
      ],
    }).compileComponents();
    storeMock = TestBed.inject(MockStore);
    modalService = TestBed.inject(ModalService);
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

  it('should warn delete compositions', () => {
    component.composition.id = 1;
    component.deleteComposition(new MouseEvent('cick'));
    expect(modalService.openModal).toHaveBeenCalled();
  });
});
