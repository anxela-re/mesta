import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ProfileDTO } from 'src/app/profiles/models/profile.dto';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SharedService } from 'src/app/shared/services/shared.service';

import { UserConfigurationComponent } from './user-configuration.component';

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

class sharedClass {
  toggleTheme = jasmine.createSpy('toggleTheme');
}
describe('UserConfigurationComponent', () => {
  let component: UserConfigurationComponent;
  let fixture: ComponentFixture<UserConfigurationComponent>;
  let storeMock: MockStore;
  let initialState: any;
  let modalService: ModalService;
  let sharedService: SharedService;
  let dispatchSpy: any;

  beforeEach(async () => {
    localStorage.setItem('access_token', 'access_token');
    localStorage.setItem('user_id', '1');
    localStorage.setItem('selected_profile', '1');
    initialState = {
      user: {
        user: { name: 'Admin', id: 1 },
      },
      auth: {
        credentials: {
          access_token: 'access_token',
          user_id: 1,
        },
      },
      profiles: {
        profiles: [
          new ProfileDTO({
            id: 1,
            name: 'profile 1',
            description: 'description',
            phases: [],
            user_id: 1,
            properties: [],
            compositions: [],
          }),
        ],
        selected: 1,
        loading: false,
        loaded: true,
        error: null,
      },
    };
    await TestBed.configureTestingModule({
      declarations: [UserConfigurationComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: ModalService, useClass: modalClass },
        { provide: SharedService, useClass: sharedClass },
        provideMockStore({ initialState }),
      ],
    }).compileComponents();
    storeMock = TestBed.inject(MockStore);
    modalService = TestBed.inject(ModalService);
    sharedService = TestBed.inject(SharedService);
    dispatchSpy = spyOn(storeMock, 'dispatch').and.callThrough();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sould return id modal', () => {
    const modalString = component.getIdModal();
    expect(modalString).toBe('user-delete-1');
  });

  it('should open delete modal warn', () => {
    component.deleteUser();
    expect(modalService.openModal).toHaveBeenCalled();
  });

  it('should delete user', () => {
    component.deleteUserConfirm();

    expect(storeMock.dispatch).toHaveBeenCalled();
  });

  it('should toggle theme', () => {
    component.toggleTheme();
    expect(sharedService.toggleTheme).toHaveBeenCalled();
  });
});
