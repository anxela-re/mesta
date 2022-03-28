import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { UserService } from '../../services/user.service';
import * as UserAction from '../../actions';
import { UserDTO } from '../../models/user.dto';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user!: UserDTO;
  constructor(public userService: UserService, private store: Store<AppState>) {
    this.store.select('user').subscribe(({user}) => {
      this.user = user;
    });
  }
  ngOnInit(): void {
    this.store.dispatch(UserAction.getUser());
  }
}
