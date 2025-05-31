import {Routes} from '@angular/router';
import {LandingComponent} from './landing/landing.component';
import {LoginComponent} from '@features/auth/components/login/login.component';
import {SignupComponent} from '@features/auth/components/signup/signup.component';
import {Page404Component} from './page404/page404.component';
import {ForgotpasswordComponent} from '@features/auth/components/forgotpassword/forgotpassword.component';
import {ResetPasswordComponent} from '@features/auth/components/reset-password/reset-password.component';
import {CheckInboxComponent} from '@features/auth/components/check-inbox/check-inbox.component';
import { DashboardComponent } from '@features/dashboard/dashboard.component';
import { ApplicationsComponent } from '@features/applications/applications.component';
import { pageLayoutComponent } from '@layout/page-layout/page-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: '',
    component: pageLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'applications', component: ApplicationsComponent },
    ]
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
    path: 'forgot-password',
    component: ForgotpasswordComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'check-inbox',
    component: CheckInboxComponent
  },
  {
    path: '**',
    component: Page404Component,
  },
];
