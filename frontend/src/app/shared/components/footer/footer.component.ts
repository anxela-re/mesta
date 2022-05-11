import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  faCopyright = faCopyright;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigate(route: string) {
    this.router.navigateByUrl(route);
  }
}
