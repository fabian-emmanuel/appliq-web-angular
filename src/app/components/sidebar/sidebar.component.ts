import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageTitleService } from '@shared/app-page-layout/page-title.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private pageTitle: PageTitleService) {}

  setTitle(title: string) {
    this.pageTitle.setTitle(title);
  }
}
