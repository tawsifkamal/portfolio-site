import { TestBed } from '@angular/core/testing';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ScreenSizeService } from './screen-size.service';
import { of } from 'rxjs';

describe('ScreenSizeService', () => {
  let service: ScreenSizeService;
  let mockBreakpointObserver: any;

  beforeEach(() => {
    mockBreakpointObserver = {
      observe: jest.fn().mockReturnValue(of({ matches: true, breakpoints: {} })),
      isMatched: jest.fn().mockReturnValue(false),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: BreakpointObserver, useValue: mockBreakpointObserver }
      ]
    });
    service = TestBed.inject(ScreenSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose signals for screen sizes', () => {
    expect(typeof service.isSmall).toBe('function');
    expect(typeof service.isMedium).toBe('function');
    expect(typeof service.isLarge).toBe('function');
  });

  it('should evaluate isSmall signal correctly', () => {
    mockBreakpointObserver.isMatched.mockImplementation((query: string) => query === '(max-width: 1023px)');
    TestBed.flushEffects(); // Process signal computations
    expect(service.isSmall()).toBe(true);
    expect(service.isMedium()).toBe(false);
    expect(service.isLarge()).toBe(false);
  });

  it('should evaluate isMedium signal correctly', () => {
    mockBreakpointObserver.isMatched.mockImplementation((query: string) => query === '(min-width: 1024px) and (max-width: 1439px)');
    TestBed.flushEffects();
    expect(service.isSmall()).toBe(false);
    expect(service.isMedium()).toBe(true);
    expect(service.isLarge()).toBe(false);
  });

  it('should evaluate isLarge signal correctly', () => {
    mockBreakpointObserver.isMatched.mockImplementation((query: string) => query === '(min-width: 1440px)');
    TestBed.flushEffects();
    expect(service.isSmall()).toBe(false);
    expect(service.isMedium()).toBe(false);
    expect(service.isLarge()).toBe(true);
  });
});
