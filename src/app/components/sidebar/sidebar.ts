import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {PageTitle} from '@shared/services/page-title/page-title';
import {User} from '@core/models/user';
import {UserService} from '@app/services/user-service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  userInfo: User | null = null;
  constructor(private pageTitle: PageTitle, private userService: UserService) {
    this.userInfo = userService.getCurrentUser();
  }

  setTitle(title: string) {
    this.pageTitle.setTitle(title);
  }
}
