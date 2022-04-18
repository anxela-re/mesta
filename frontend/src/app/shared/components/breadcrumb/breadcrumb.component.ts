import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export interface IBreacrumbHistory {
  name?: string;
  navigateName?: string;
}
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  @Input()
  breacrumbHistory: IBreacrumbHistory[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigate(url?: string) {
    if (url) {
      this.router.navigateByUrl(url);
    }
  }
}
