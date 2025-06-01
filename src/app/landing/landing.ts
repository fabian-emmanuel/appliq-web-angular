import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet


  ],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class LandingComponent {

}
