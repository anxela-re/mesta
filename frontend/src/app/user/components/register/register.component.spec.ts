import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let storeMock: MockStore;
  let initialState: any;

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
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      declarations: [RegisterComponent],
      providers: [
        provideMockStore({ initialState }),
      ],
    }).compileComponents();
    storeMock = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
