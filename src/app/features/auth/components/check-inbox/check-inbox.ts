import { Component } from '@angular/core';
import {BrandComponent} from '@shared/components/brand/brand';
import {FormsModule} from '@angular/forms';
import {InputWithIconComponent} from '@shared/components/input-with-icon/input-with-icon';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-check-inbox',
  imports: [
    BrandComponent,
    FormsModule,
    InputWithIconComponent,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './check-inbox.html',
  styleUrl: './check-inbox.css'
})
export class CheckInboxComponent {

}
