import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxColorsModule } from 'ngx-colors';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    NgxColorsModule,
    SharedModule,
    
  ],
  exports: [UserProfileComponent],
})
export class ProfilesModule {}
