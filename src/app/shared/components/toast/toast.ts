import { Component } from '@angular/core';
import {MessageService} from 'primeng/api';
import {Toast as Primetoast} from 'primeng/toast';
import {Button} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-toast',
  imports: [
    Primetoast,
    Button,
    Ripple,
    RouterOutlet,
  ],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
  providers: [MessageService]
})
export class Toast {
  constructor(private messageService: MessageService) {}

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }

  showInfo() {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content' });
  }

  showWarn() {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Message Content' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
  }

  showContrast() {
    this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Message Content' });
  }

  showSecondary() {
    this.messageService.add({ severity: 'secondary', summary: 'Secondary', detail: 'Message Content' });
  }

}
