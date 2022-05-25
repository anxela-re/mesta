import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './auth/components/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './user/components/register/register.component';
import { ResetPasswordComponent } from './auth/components/reset-password/reset-password.component';
import { UserProfileComponent } from './profiles/components/user-profile/user-profile.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LandingPageComponent } from './shared/components/landing-page/landing-page.component';
import { UserConfigurationComponent } from './user/components/user-configuration/user-configuration.component';
import { IsNotLoggedGuard } from './shared/guards/is-not-logged.guard';
import { ProfileSelectedGuard } from './shared/guards/profile-selected.guard';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: '',
    component: LandingPageComponent,
    canActivate: [IsNotLoggedGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [IsNotLoggedGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [IsNotLoggedGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [IsNotLoggedGuard],
  },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: 'configuration',
    component: UserConfigurationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/:id',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes/recipes.module').then((m) => m.RecipesModule),
    canActivate: [AuthGuard, ProfileSelectedGuard],
  },
  {
    path: 'components',
    loadChildren: () =>
      import('./components/components.module').then((m) => m.ComponentsModule),
    canActivate: [AuthGuard, ProfileSelectedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
