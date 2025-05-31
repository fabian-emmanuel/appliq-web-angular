import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { SideNavComponent } from '@layout/side-nav/side-nav.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { ThemeSwitchComponent } from 'src/app/components/theme-switch/theme-switch.component';
import { TopbarComponent } from 'src/app/components/topbar/topbar.component';

@Component({
  selector: 'app-page-layout',
  imports: [RouterOutlet, SidebarComponent, TopbarComponent, CommonModule],
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.css'
})

export class pageLayoutComponent {
}

