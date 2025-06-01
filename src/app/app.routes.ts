import {Routes} from '@angular/router';
import {LandingComponent} from './landing/landing';
import {LoginComponent} from '@features/auth/components/login/login';
import {SignupComponent} from '@features/auth/components/signup/signup';
import {Page404Component} from './page404/page404';
import {ForgotpasswordComponent} from '@features/auth/components/forgotpassword/forgotpassword';
import {ResetPasswordComponent} from '@features/auth/components/reset-password/reset-password';
import {CheckInboxComponent} from '@features/auth/components/check-inbox/check-inbox';
import { DashboardComponent } from '@features/dashboard/dashboard';
import { ApplicationsComponent } from '@features/applications/applications';
import { PageLayoutComponent } from '@layout/page-layout/page-layout';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: '',
    component: PageLayoutComponent,
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
