import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
// User interface
export class User {
  name: any;
  email: any;
}
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user!: User;
  constructor(public authService: AuthService) {
    this.authService.profileUser().subscribe(
      (data: any) => {
        console.info(data);
        this.user = data;
      },
      (error) => console.log(error)
    );
  }
  ngOnInit() {}
}
