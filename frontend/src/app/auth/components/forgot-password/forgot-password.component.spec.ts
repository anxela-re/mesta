import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ForgotPasswordComponent } from './forgot-password.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AuthState, initialState as initialStateReducer } from '../../reducers';
import { Store } from '@ngrx/store';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';

class loadingClass {
  showLoading = jasmine.createSpy('showLoading');
  hideLoading = jasmine.createSpy('hideLoading');
  loading = {
    show: () => {},
    hide: () => {},
  };
}
class toastClass {
  showToast = jasmine.createSpy('showToast');
}
describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let storeMock: MockStore;
  let initialState: any;
  let loadingService: any;
  let toastService: any;
  let authService: AuthService;

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
      declarations: [ForgotPasswordComponent],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: LoadingService, useClass: loadingClass },
        { provide: ToastService, useClass: toastClass },
      ],
    }).compileComponents();

    storeMock = TestBed.inject(MockStore);
    loadingService = TestBed.inject(LoadingService);
    toastService = TestBed.inject(ToastService);
    authService = TestBed.inject(AuthService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should request forgot password', () => {
    const data = { msg: 'check' };
    component.forgotPasswordForm.setValue({
      email: 'admin@mesta.com',
    });
    const forgotPasword = spyOn(authService, 'forgotPassword').and.returnValue(
      of(data)
    );
    component.onSubmit();

    expect(loadingService.showLoading).toHaveBeenCalled();
  });
  it('should request forgot password and fail', () => {
    const data = { msg: 'check' };
    component.forgotPasswordForm.setValue({
      email: 'admin@mesta.com',
    });
    const forgotPasword = spyOn(authService, 'forgotPassword').and.returnValue(
      throwError('Error')
    );
    component.onSubmit();

    expect(loadingService.showLoading).toHaveBeenCalled();
    expect(toastService.showToast).toHaveBeenCalled();
  });
});
