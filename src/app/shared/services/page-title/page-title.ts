import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageTitle {

  private titleSubject = new BehaviorSubject<string>('Dashboard');
  title$ = this.titleSubject.asObservable();

  constructor() { }

  setTitle(title: string) {
    this.titleSubject.next(title);
  }
}
