import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {PageTitle} from '../../shared/services/page-title/page-title';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  constructor(private pageTitle: PageTitle) {}

  setTitle(title: string) {
    this.pageTitle.setTitle(title);
  }
}
