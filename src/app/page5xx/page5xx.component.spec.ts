import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page5xxComponent } from './page5xx.component';

describe('Page5xxComponent', () => {
  let component: Page5xxComponent;
  let fixture: ComponentFixture<Page5xxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Page5xxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Page5xxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
