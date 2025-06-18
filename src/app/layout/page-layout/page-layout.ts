
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Sidebar} from '../../components/sidebar/sidebar';
import {Topbar} from '../../components/topbar/topbar';

@Component({
  selector: 'app-page-layout',
  imports: [RouterOutlet, Sidebar, Topbar],
  templateUrl: './page-layout.html',
  styleUrl: './page-layout.css'
})

export class PageLayout {
}

