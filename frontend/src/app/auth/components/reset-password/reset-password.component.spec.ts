import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of, throwError } from 'rxjs';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UserDTO } from 'src/app/user/models/user.dto';
import { UserService } from 'src/app/user/services/user.service';
import { AuthService } from '../../services/auth.service';

import { ResetPasswordComponent } from './reset-password.component';

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
describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let storeMock: MockStore;
  let initialState: any;
  let authService: AuthService;
  let userService: UserService;
  let loadingService: any;
  let toastService: any;

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
      user: {
        user: new UserDTO('Admin', 'admin@mesta.com'),
      },
    };
    await TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: LoadingService, useClass: loadingClass },
        { provide: ToastService, useClass: toastClass },
      ],
    }).compileComponents();

    storeMock = TestBed.inject(MockStore);
    authService = TestBed.inject(AuthService);
    userService = TestBed.inject(UserService);
    loadingService = TestBed.inject(LoadingService);
    toastService = TestBed.inject(ToastService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update user password', () => {
    component.user = {
      id: 1,
      name: 'name',
      email: 'name@mesta.com',
    };
    component.password.setValue('password');
    component.password_confirmation.setValue('password');
    const data = { msg: 'ok' };
    const updateUser = spyOn(userService, 'updateUser').and.returnValue(
      of(data)
    );

    component.onSubmit();

    expect(loadingService.showLoading).toHaveBeenCalled();
    expect(updateUser).toHaveBeenCalled();
  });

  it('should update user password fails', () => {
    component.user = {
      id: 1,
      name: 'name',
      email: 'name@mesta.com',
    };
    component.password.setValue('password');
    component.password_confirmation.setValue('password');
    const data = { msg: 'ok' };
    const updateUser = spyOn(userService, 'updateUser').and.returnValue(
      throwError('Error')
    );

    component.onSubmit();

    expect(loadingService.showLoading).toHaveBeenCalled();
    expect(updateUser).toHaveBeenCalled();
    expect(toastService.showToast).toHaveBeenCalled();
  });
  
});
