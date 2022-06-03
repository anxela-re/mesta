import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ProfileDTO } from '../../models/profile.dto';
import * as ProfilesActions from '../../actions';
import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let storeMock: MockStore;
  let activatedRoute;
  let initialState: any;
  let dispatchSpy: any;

  const activatedRouteStub = {
    snapshot: {
      paramMap: {
        get: () => ({ id: 1 }),
      },
    },
  };

  beforeEach(async () => {
    localStorage.setItem('access_token', 'access_token');
    localStorage.setItem('user_id', '1');
    localStorage.setItem('selected_profile', '1');
    initialState = {
      user: {
        user: {
          id: 1,
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
      declarations: [UserProfileComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        provideMockStore({ initialState }),
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
    }).compileComponents();

    storeMock = TestBed.inject(MockStore);
    activatedRoute = TestBed.inject(ActivatedRoute);
    dispatchSpy = spyOn(storeMock, 'dispatch').and.callThrough();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create profile', () => {
    component.addNewPhase();
    component.profileForm.setValue({
      description: 'description',
      name: 'profile 2',
      color: '#000',
      phases: [{ name: 'fase', color: '#000' }],
    });
    component.onSubmit();

    expect(storeMock.dispatch).toHaveBeenCalled();
  });

  it('should update profile', () => {
    component.addNewPhase();
    component.profile.id = 1;
    component.profileForm.setValue({
      description: 'description',
      name: 'profile 2',
      color: '#000',
      phases: [{ name: 'fase', color: '#000' }],
    });
    component.onSubmit();

    expect(storeMock.dispatch).toHaveBeenCalled();
  });
});
