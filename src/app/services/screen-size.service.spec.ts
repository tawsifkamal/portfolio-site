import { TestBed } from '@angular/core/testing';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { ScreenSizeService } from './screen-size.service';

describe('ScreenSizeService', () => {
  let service: ScreenSizeService;
  let breakpointObserverSpy: jasmine.SpyObj<BreakpointObserver>;
  let breakpointSubject: Subject<any>;

  beforeEach(() => {
    breakpointSubject = new Subject();
    breakpointObserverSpy = jasmine.createSpyObj('BreakpointObserver', ['observe', 'isMatched']);
    breakpointObserverSpy.observe.and.returnValue(breakpointSubject.asObservable());

    TestBed.configureTestingModule({
      providers: [
        ScreenSizeService,
        { provide: BreakpointObserver, useValue: breakpointObserverSpy }
      ]
    });
    service = TestBed.inject(ScreenSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize breakpoint observer with correct queries', () => {
    expect(breakpointObserverSpy.observe).toHaveBeenCalledWith([
      '(max-width: 1023px)',
      '(min-width: 1024px) and (max-width: 1439px)',
      '(min-width: 1440px)'
    ]);
  });

  it('should set isSmall to true when small screen breakpoint matches', () => {
    breakpointObserverSpy.isMatched.and.callFake((query: string) => {
      return query === '(max-width: 1023px)';
    });
    
    breakpointSubject.next({});
    
    expect(service.isSmall).toBe(true);
    expect(service.isMedium).toBe(false);
    expect(service.isLarge).toBe(false);
  });

  it('should set isMedium to true when medium screen breakpoint matches', () => {
    breakpointObserverSpy.isMatched.and.callFake((query: string) => {
      return query === '(min-width: 1024px) and (max-width: 1439px)';
    });
    
    breakpointSubject.next({});
    
    expect(service.isSmall).toBe(false);
    expect(service.isMedium).toBe(true);
    expect(service.isLarge).toBe(false);
  });

  it('should set isLarge to true when large screen breakpoint matches', () => {
    breakpointObserverSpy.isMatched.and.callFake((query: string) => {
      return query === '(min-width: 1440px)';
    });
    
    breakpointSubject.next({});
    
    expect(service.isSmall).toBe(false);
    expect(service.isMedium).toBe(false);
    expect(service.isLarge).toBe(true);
  });

  it('should update screen size properties when breakpoint changes', () => {
    // Initially set to small
    breakpointObserverSpy.isMatched.and.callFake((query: string) => {
      return query === '(max-width: 1023px)';
    });
    breakpointSubject.next({});
    expect(service.isSmall).toBe(true);

    // Change to large
    breakpointObserverSpy.isMatched.and.callFake((query: string) => {
      return query === '(min-width: 1440px)';
    });
    breakpointSubject.next({});
    expect(service.isLarge).toBe(true);
    expect(service.isSmall).toBe(false);
  });
});
