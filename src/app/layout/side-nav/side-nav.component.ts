import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {CommonModule} from '@angular/common';



export interface NavItem {
  label: string;
  icon?: string;
  route?: string;
  children?: NavItem[];
  expanded?: boolean;
}

@Component({
  selector: 'app-side-nav',
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  @Input() title = 'My App';
  @Input() userName = 'John Doe';
  @Input() userRole = 'Administrator';
  @Input() isCollapsed = false;
  @Input() isMobileOpen = false;
  @Input() navItems: NavItem[] = [
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
    {
      label: 'Products',
      icon: '📦',
      children: [
        { label: 'All Products', route: '/products' },
        { label: 'Add Product', route: '/products/add' },
        { label: 'Categories', route: '/products/categories' }
      ]
    },
    {
      label: 'Orders',
      icon: '🛒',
      route: '/orders'
    },
    {
      label: 'Reports',
      icon: '📈',
      children: [
        { label: 'Sales Report', route: '/reports/sales' },
        { label: 'User Report', route: '/reports/users' },
        { label: 'Analytics', route: '/reports/analytics' }
      ]
    },
    {
      label: 'Settings',
      icon: '⚙️',
      route: '/settings'
    }
  ];

  @Output() collapseToggle = new EventEmitter<boolean>();
  @Output() mobileToggle = new EventEmitter<boolean>();

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.collapseToggle.emit(this.isCollapsed);
  }

  toggleExpand(item: NavItem) {
    if (this.isCollapsed) {
      return;
    }
    item.expanded = !item.expanded;
  }

  closeMobileNav() {
    this.isMobileOpen = false;
    this.mobileToggle.emit(this.isMobileOpen);
  }

}
