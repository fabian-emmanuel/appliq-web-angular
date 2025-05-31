import { Component } from '@angular/core';
import {BrandComponent} from '@shared/components/brand/brand.component';
import {FormsModule} from '@angular/forms';
import {InputWithIconComponent} from '@shared/components/input-with-icon/input-with-icon.component';
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
  templateUrl: './check-inbox.component.html',
  styleUrl: './check-inbox.component.css'
})
export class CheckInboxComponent {

}
