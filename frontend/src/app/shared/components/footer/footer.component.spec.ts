import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AuthTokenDTO } from 'src/app/auth/models/authToken.dto';

import { FooterComponent } from './footer.component';

const initialState = {
  auth: {
    credentials: new AuthTokenDTO('', ''),
    loading: false,
    loaded: true,
    error: null,
  },
};
describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent ],
      imports: [RouterTestingModule],
      providers: [
        provideMockStore({
          initialState,
        }),
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
