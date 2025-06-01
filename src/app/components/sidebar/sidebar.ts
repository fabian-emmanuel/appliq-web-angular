import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import { PageTitleService } from '@shared/app-page-layout/page-title.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {
  constructor(private pageTitle: PageTitleService) {}

  setTitle(title: string) {
    this.pageTitle.setTitle(title);
  }
}
