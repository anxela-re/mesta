import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthTokenDTO } from 'src/app/auth/models/authToken.dto';
import { PhaseDTO } from 'src/app/phases/models/phase.dto';
import { ProfileDTO } from 'src/app/profiles/models/profile.dto';
import { PropertyDTO } from 'src/app/properties/models/property.dto';
import { PropertiesModule } from 'src/app/properties/properties.module';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsRoutingModule } from '../../components-routing.module';

import { ComponentFormComponent } from './component-form.component';

class loadingClass {
  showLoading = () => {};
  hideLoading = () => {};
  loading = {
    show: () => {},
    hide: () => {},
  };
}
describe('ComponentFormComponent', () => {
  let component: ComponentFormComponent;
  let fixture: ComponentFixture<ComponentFormComponent>;
  let storeMock: MockStore;
  let activatedRoute;
  let initialState: any;

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
      auth: {
        credentials: new AuthTokenDTO('1', 'access_token'),
        loading: false,
        loaded: true,
        error: null,
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
      phases: {
        phases: [
          new PhaseDTO({
            id: 1,
            name: 'phase 1',
            description: 'description',
            profile_id: 1,
          }),
        ],
        loading: false,
        loaded: true,
        error: null,
      },
      properties: {
        properties: [
          new PropertyDTO({
            id: 1,
            name: 'property 1',
            profile_id: 1,
          }),
        ],
        loading: false,
        loaded: true,
        error: null,
      },
    };

    await TestBed.configureTestingModule({
      declarations: [ComponentFormComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: LoadingService, useClass: loadingClass },
      ],
    }).compileComponents();

    storeMock = TestBed.inject(MockStore);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
