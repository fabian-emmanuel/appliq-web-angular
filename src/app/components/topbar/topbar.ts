import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable} from 'rxjs';
import {PageTitle} from '../../shared/services/page-title/page-title';


@Component({
  selector: 'app-topbar',
  imports: [CommonModule],
  templateUrl: './topbar.html',
  styleUrls: ['./topbar.css']
})
export class Topbar {

  title$: Observable<string>;
  menuOpen = false;

  constructor(private pageTitle: PageTitle) {
    this.title$ = this.pageTitle.title$;
  }


  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  setTheme(theme: string) {
    console.log('Theme selected:', theme);
    this.menuOpen = false;
  }
}

