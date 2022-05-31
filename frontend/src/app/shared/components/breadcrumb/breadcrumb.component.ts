import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface IBreadcrumbHistory {
  name?: string;
  navigateName?: string;
}
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit {
  @Input()
  breadcrumbHistory: IBreadcrumbHistory[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigate(url?: string) {
    if (url) {
      this.router.navigateByUrl(url);
    }
  }
}
