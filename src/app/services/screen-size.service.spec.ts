import { TestBed } from '@angular/core/testing';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subject } from 'rxjs';

import { ScreenSizeService } from './screen-size.service';

describe('ScreenSizeService', () => {
  let service: ScreenSizeService;
  let breakpointObserverMock: any;
  let observeSubject: Subject<any>;

  beforeEach(() => {
    observeSubject = new Subject();
    breakpointObserverMock = {
      observe: jest.fn().mockReturnValue(observeSubject.asObservable()),
      isMatched: jest.fn().mockReturnValue(false),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: BreakpointObserver, useValue: breakpointObserverMock }
      ]
    });
    service = TestBed.inject(ScreenSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should compute isSmall correctly', () => {
    breakpointObserverMock.isMatched.mockImplementation((query: string) => query === '(max-width: 1023px)');
    observeSubject.next({});
    TestBed.flushEffects();
    expect(service.isSmall()).toBe(true);
    expect(service.isMedium()).toBe(false);
    expect(service.isLarge()).toBe(false);
  });

  it('should compute isMedium correctly', () => {
    breakpointObserverMock.isMatched.mockImplementation((query: string) => query === '(min-width: 1024px) and (max-width: 1439px)');
    observeSubject.next({});
    TestBed.flushEffects();
    expect(service.isSmall()).toBe(false);
    expect(service.isMedium()).toBe(true);
    expect(service.isLarge()).toBe(false);
  });

  it('should compute isLarge correctly', () => {
    breakpointObserverMock.isMatched.mockImplementation((query: string) => query === '(min-width: 1440px)');
    observeSubject.next({});
    TestBed.flushEffects();
    expect(service.isSmall()).toBe(false);
    expect(service.isMedium()).toBe(false);
    expect(service.isLarge()).toBe(true);
  });
});
