import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-compositions-list',
  templateUrl: './compositions-list.component.html',
  styleUrls: ['./compositions-list.component.scss'],
})
export class CompositionsListComponent implements OnInit {
  faPlus = faPlus;

  isAdding: boolean = false;
  constructor(private router: Router) {}

  ngOnInit(): void {}
  onCreate(): void {
    console.info('on create');
    this.isAdding = true;
  }
}
