import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Brand} from '../../../../shared/components/brand/brand';

@Component({
  selector: 'app-check-inbox',
  imports: [
    FormsModule,
    RouterOutlet,
    RouterLink,
    Brand
  ],
  templateUrl: './check-inbox.html',
  styleUrl: './check-inbox.css'
})
export class CheckInbox {

}
