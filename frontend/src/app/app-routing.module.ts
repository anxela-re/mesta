import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './auth/components/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './user/components/register/register.component';
import { ResetPasswordComponent } from './auth/components/reset-password/reset-password.component';
import { UserProfileComponent } from './user/components/user-profile/user-profile.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LandingPageComponent } from './shared/components/landing-page/landing-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'configuration',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '', component: LandingPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
