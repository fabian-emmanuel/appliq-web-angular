import { Component } from '@angular/core';
import { ThemeSwitchComponent } from '../theme-switch/theme-switch';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageTitleService } from '@shared/app-page-layout/page-title.service';


@Component({
  selector: 'app-topbar',
  imports: [CommonModule],
  templateUrl: './topbar.html',
  styleUrls: ['./topbar.css']
})
export class TopbarComponent {
  title$ = this.pageTitle.title$;

  constructor(private pageTitle: PageTitleService) {}

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  setTheme(theme: string) {
    console.log('Theme selected:', theme);
    this.menuOpen = false;
  }
}

