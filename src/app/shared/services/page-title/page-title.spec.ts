import { TestBed } from '@angular/core/testing';

import { PageTitle } from '@shared/services/page-title/page-title';

describe('PageTitle', () => {
  let service: PageTitle;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageTitle);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
