import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page5xx } from './page5xx';

describe('Page5xx', () => {
  let component: Page5xx;
  let fixture: ComponentFixture<Page5xx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Page5xx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Page5xx);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
