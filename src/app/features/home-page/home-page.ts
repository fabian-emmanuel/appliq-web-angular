import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {Footer} from '../../shared/components/footer/footer';
import {HowItWorks} from '../../shared/components/how-it-works/how-it-works';
import {Features} from '../../shared/components/features/features';

@Component({
  selector: 'app-home-page',
  imports: [
    RouterLink,
    RouterOutlet,
    Footer,
    Features,
    HowItWorks
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {
  mobileMenuOpen = false;

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

}
