import { TestBed } from '@angular/core/testing';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ScreenSizeService } from './screen-size.service';
import { of } from 'rxjs';

describe('ScreenSizeService', () => {
  let service: ScreenSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: BreakpointObserver,
          useValue: { observe: () => of({}), isMatched: () => false }
        }
      ]
    });

    TestBed.overrideProvider(BreakpointObserver, {
      useValue: { observe: () => of({}), isMatched: () => false }
    });
    service = TestBed.inject(ScreenSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
