import {Routes} from '@angular/router';
import {LandingComponent} from './landing/landing.component';
import {LoginComponent} from '@features/auth/components/login/login.component';
import {SignupComponent} from '@features/auth/components/signup/signup.component';
import {Page404Component} from './page404/page404.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: '**',
    component: Page404Component,
  }
];
