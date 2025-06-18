import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInbox } from './check-inbox';

describe('CheckInbox', () => {
  let component: CheckInbox;
  let fixture: ComponentFixture<CheckInbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckInbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckInbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
