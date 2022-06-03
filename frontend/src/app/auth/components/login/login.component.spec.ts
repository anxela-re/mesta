import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let storeMock: MockStore;
  let initialState: any;
  let dispatchSpy: any;
  let actions$ = new Observable<Action>();

  beforeEach(async () => {
    initialState = {
      auth: {
        credentials: {
          user_id: '',
          access_token: '',
          token_expires_at: '',
        },
        loading: false,
        loaded: true,
        error: null,
      },
    };
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        provideMockStore({ initialState }),
        provideMockActions(() => actions$),
      ],
    }).compileComponents();

    storeMock = TestBed.inject(MockStore);
    dispatchSpy = spyOn(storeMock, 'dispatch').and.callThrough();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch login', () => {
    component.email.setValue('admin@mesta.com')
    component.password.setValue('admin');

    component.onSubmit();

    expect(storeMock.dispatch).toHaveBeenCalled();

  })
});
