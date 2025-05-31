import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { pageLayoutComponent } from '@layout/page-layout/page-layout.component';
// import { SideNavComponent } from '@layout/side-nav/side-nav.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { ThemeSwitchComponent } from 'src/app/components/theme-switch/theme-switch.component';
import { TopbarComponent } from 'src/app/components/topbar/topbar.component';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, pageLayoutComponent, CommonModule, SidebarComponent, TopbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  cards = Array(4); 
}

