
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageLayoutComponent } from '@layout/page-layout/page-layout';
// import { SideNavComponent } from '@layout/side-nav/side-nav';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar';
import { ThemeSwitchComponent } from 'src/app/components/theme-switch/theme-switch';
import { TopbarComponent } from 'src/app/components/topbar/topbar';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, PageLayoutComponent, SidebarComponent, TopbarComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  cards = Array(4);
}

