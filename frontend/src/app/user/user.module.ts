import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from '../app-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { UserConfigurationComponent } from './components/user-configuration/user-configuration.component';
import { NgxColorsModule } from 'ngx-colors';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RegisterComponent,
    UserConfigurationComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgxColorsModule,
    SharedModule
  ],
})
export class UserModule {}
