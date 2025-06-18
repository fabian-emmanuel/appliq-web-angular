import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {Observable} from 'rxjs';
import {PageTitle} from '../../shared/services/page-title/page-title';
import {environment} from '../../../environment/environment';


@Component({
  selector: 'app-topbar',
  imports: [CommonModule],
  templateUrl: './topbar.html',
  styleUrls: ['./topbar.css']
})
export class Topbar {

  title$: Observable<string>;
  buyMeACoffeeUrl!: string | undefined;


  constructor(private pageTitle: PageTitle) {
    this.title$ = this.pageTitle.title$;
    this.buyMeACoffeeUrl = environment.KOFI_URL;
    console.log(`Buy Me A Coffee URL ${this.buyMeACoffeeUrl}`);
  }
}

