
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { SideNavComponent } from '@layout/side-nav/side-nav';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar';
import { ThemeSwitchComponent } from 'src/app/components/theme-switch/theme-switch';
import { TopbarComponent } from 'src/app/components/topbar/topbar';

@Component({
  selector: 'app-page-layout',
  imports: [RouterOutlet, SidebarComponent, TopbarComponent],
  templateUrl: './page-layout.html',
  styleUrl: './page-layout.css'
})

export class PageLayoutComponent {
}

