import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxColorsModule } from 'ngx-colors';
import { SharedModule } from '../shared/shared.module';
import { ProfileItemComponent } from './components/profile-item/profile-item.component';

@NgModule({
  declarations: [UserProfileComponent, ProfileItemComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxColorsModule,
    SharedModule,
  ],
  exports: [UserProfileComponent, ProfileItemComponent],
})
export class ProfilesModule {}
