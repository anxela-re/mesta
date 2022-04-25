import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { RecipeDTO } from '../../models/recipe.dto';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
  private searchSubject: Subject<string> = new Subject();
  
  recipes: RecipeDTO[] = [];
  searchTerm: string = '';


  faPlus = faPlus;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  search() {
    this.searchSubject.next(this.searchTerm);
  }

  onCreate(): void {
    this.router.navigate(['recipes', 'formulation']);
  }
}
