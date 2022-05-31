import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PropertyDTO } from 'src/app/properties/models/property.dto';
import { RecipeDTO } from '../../models/recipe.dto';
import { RecipeItemComponent } from './recipe-item.component';

describe('RecipeItemComponent', () => {
  let component: RecipeItemComponent;
  let fixture: ComponentFixture<RecipeItemComponent>;

  beforeEach(async () => {
    localStorage.setItem('theme', 'dark');
    await TestBed.configureTestingModule({
      declarations: [RecipeItemComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeItemComponent);
    component = fixture.componentInstance;

    component.recipe = new RecipeDTO({ name: 'recipe', id: 1 });
    component.properties = [new PropertyDTO({ name: 'property', id: 1, profile_id: 1 })];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
