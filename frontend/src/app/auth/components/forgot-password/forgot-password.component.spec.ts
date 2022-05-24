import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ForgotPasswordComponent } from './forgot-password.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AuthState, initialState as initialStateReducer } from '../../reducers';
import { Store } from '@ngrx/store';

fdescribe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let store: MockStore<AuthState>;
  const initialState: AuthState = initialStateReducer;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    
    store = TestBed.get<Store>(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
