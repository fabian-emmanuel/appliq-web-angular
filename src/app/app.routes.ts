import { Routes } from '@angular/router';
import {Page404} from './page404/page404';
import {PageLayout} from './layout/page-layout/page-layout';
import { Dashboard } from './features/dashboard/dashboard';
import { Applications } from './features/applications/applications';
import {Calendar} from './features/calendar/components/calendar/calendar';
import { Login } from './features/auth/components/login/login';
import { Signup } from './features/auth/components/signup/signup';
import {ResetPassword} from './features/auth/components/reset-password/reset-password';
import {CheckInbox} from './features/auth/components/check-inbox/check-inbox';
import {HomePage} from './features/home-page/home-page';
import {ForgotPassword} from './features/auth/components/forgot-password/forgot-password';

export const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: '',
    component: PageLayout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'applications', component: Applications },
      { path: 'calendar', component: Calendar },
    ]
  },
  {
    path: "login",
    component: Login
  },
  {
    path: "signup",
    component: Signup
  },
  {
    path: 'forgot-password',
    component: ForgotPassword
  },
  {
    path: 'reset-password',
    component: ResetPassword
  },
  {
    path: 'check-inbox',
    component: CheckInbox
  },
  {
    path: '**',
    component: Page404,
  },
];
