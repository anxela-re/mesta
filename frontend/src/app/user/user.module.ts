import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { UserConfigurationComponent } from './components/user-configuration/user-configuration.component';
import { NgxColorsModule } from 'ngx-colors';
import { SharedModule } from '../shared/shared.module';
import { ProfilesModule } from '../profiles/profiles.module';

@NgModule({
  declarations: [RegisterComponent, UserConfigurationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxColorsModule,
    SharedModule,
    ProfilesModule,
  ],
})
export class UserModule {}
