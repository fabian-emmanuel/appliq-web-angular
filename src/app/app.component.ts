import { Component } from '@angular/core';
import {NavItem, SideNavComponent} from '@layout/side-nav/side-nav.component';
import {RouterOutlet} from '@angular/router';
import { DashboardComponent } from '@features/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { ThemeSwitchComponent } from './components/theme-switch/theme-switch.component';

@Component({
  selector: 'app-root',
  imports: [SideNavComponent, RouterOutlet, DashboardComponent, SidebarComponent, TopbarComponent, ThemeSwitchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'appliq';
  appTitle = 'Admin Panel';
  currentUser = 'John Doe';
  currentUserRole = 'Administrator';
  sideNavCollapsed = false;
  mobileNavOpen = false;

  navigationItems: NavItem[] = [
    {
      label: 'Dashboard',
      icon: '📊',
      route: '/dashboard'
    },
    {
      label: 'Users',
      icon: '👥',
      children: [
        { label: 'All Users', route: '/users' },
        { label: 'Add User', route: '/users/add' },
        { label: 'User Roles', route: '/users/roles' }
      ]
    },
    // ... more items
  ];

  onNavCollapseToggle(collapsed: boolean) {
    this.sideNavCollapsed = collapsed;
  }

  onMobileNavToggle(open: boolean) {
    this.mobileNavOpen = open;
  }

  toggleMobileNav() {
    this.mobileNavOpen = !this.mobileNavOpen;
  }

  // currentUser = 'John Doe';
  // currentUserEmail = 'john.doe@gmail.com';
  // pageTitle = 'Dashboard';
  // sidebarCollapsed = false;
  //
  // navigationItems: NavItem[] = [
  //   {
  //     label: 'Dashboard',
  //     icon: 'fas fa-th-large',
  //     route: '/dashboard'
  //   },
  //   {
  //     label: 'Applications',
  //     icon: 'fas fa-rocket',
  //     route: '/applications'
  //   },
  //   {
  //     label: 'Calendar',
  //     icon: 'fas fa-calendar-alt',
  //     route: '/calendar'
  //   },
  //   {
  //     label: 'Settings',
  //     icon: 'fas fa-cog',
  //     route: '/settings'
  //   }
  // ];
  //
  // onSidebarToggle(collapsed: boolean) {
  //   this.sidebarCollapsed = collapsed;
  //   console.log('Sidebar collapsed:', collapsed);
  // }
  //
  // onNavigationChange(route: string) {
  //   console.log('Navigation changed to:', route);
  //   // Handle navigation change logic here
  //   // You might want to update the current page title based on the route
  // }
}
