import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PortfolioService } from './services/portfolio.service';
import { ScreenSizeService } from './services/screen-size.service';
import { PLATFORM_ID, NgZone } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

// Mock isPlatformBrowser
jest.mock('@angular/common', () => {
    const original = jest.requireActual('@angular/common');
    return {
        ...original,
        isPlatformBrowser: jest.fn(() => true)
    };
});

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let portfolioService: PortfolioService;
  let screenSizeService: ScreenSizeService;
  let ngZone: NgZone;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, CommonModule],
      providers: [
        PortfolioService,
        ScreenSizeService,
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    portfolioService = TestBed.inject(PortfolioService);
    screenSizeService = TestBed.inject(ScreenSizeService);
    ngZone = TestBed.inject(NgZone);

    jest.spyOn(document, 'getElementById').mockImplementation((id) => {
        const el = document.createElement('div');
        el.scrollIntoView = jest.fn();
        Object.defineProperty(el, 'offsetTop', { value: 100 });
        return el;
    });

    jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
        if (selector === '.mouse-follower') {
            return {
                style: {
                    display: '',
                    background: ''
                }
            } as any as HTMLElement;
        }
        return null;
    });

    // Reset mock to true
    (isPlatformBrowser as jest.Mock).mockReturnValue(true);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'portfolio-website' title`, () => {
    expect(component.title).toEqual('portfolio-website');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Tawsif Kamal');
  });

  it('should initialize offsets after view init in browser', fakeAsync(() => {
    (isPlatformBrowser as jest.Mock).mockReturnValue(true);

    // Manually call ngAfterViewInit to ensure it runs
    component.ngAfterViewInit();
    tick(200);

    expect(component.offsets.ABOUT).toBe(30);
    expect(component.offsets.EXPERIENCE).toBe(30);
    expect(component.offsets.PROJECTS).toBe(30);
  }));

  it('should NOT initialize offsets after view init in non-browser', fakeAsync(() => {
    (isPlatformBrowser as jest.Mock).mockReturnValue(false);

    component.ngAfterViewInit();
    tick(200);

    expect(component.offsets.ABOUT).toBe(0);
    expect(component.offsets.EXPERIENCE).toBe(0);
    expect(component.offsets.PROJECTS).toBe(0);
  }));

  it('should navigate to section in browser', () => {
      (isPlatformBrowser as jest.Mock).mockReturnValue(true);
      component.navigateToSection('ABOUT');
      expect(document.getElementById).toHaveBeenCalledWith('ABOUT');
  });

  it('should NOT navigate to section in non-browser', () => {
      (isPlatformBrowser as jest.Mock).mockReturnValue(false);
      (document.getElementById as jest.Mock).mockClear();
      component.navigateToSection('ABOUT');
      expect(document.getElementById).not.toHaveBeenCalled();
  });

  it('should update currentSection on window scroll', () => {
      component.offsets = {
          ABOUT: 0,
          EXPERIENCE: 500,
          PROJECTS: 1000
      };
      const zoneSpy = jest.spyOn(ngZone, 'run');

      Object.defineProperty(window, 'pageYOffset', { value: 100, configurable: true });
      component.onWindowScroll();
      expect(component.currentSection).toBe('ABOUT');

      Object.defineProperty(window, 'pageYOffset', { value: 600, configurable: true });
      component.onWindowScroll();
      expect(zoneSpy).toHaveBeenCalled();
      expect(component.currentSection).toBe('EXPERIENCE');

      Object.defineProperty(window, 'pageYOffset', { value: 1100, configurable: true });
      component.onWindowScroll();
      expect(component.currentSection).toBe('PROJECTS');
  });

  it('should update mouse follower position on mouse move', () => {
      const mockStyle = { display: '', background: '' };
      const mockFollower = { style: mockStyle } as any as HTMLElement;
      jest.spyOn(document, 'querySelector').mockReturnValue(mockFollower);

      const mouseEvent = new MouseEvent('mousemove', {
          clientX: 100,
          clientY: 200
      });
      component.onMouseMove(mouseEvent);

      expect(mockStyle.background).toContain('radial-gradient');
      expect(mockStyle.background).toContain('100px 200px');
  });

  it('should cleanup event listeners on destroy', () => {
      (isPlatformBrowser as jest.Mock).mockReturnValue(true);
      // Call init manually
      component.ngAfterViewInit();

      const removeListenerSpy = jest.spyOn(window, 'removeEventListener');
      const docRemoveListenerSpy = jest.spyOn(document, 'removeEventListener');

      component.ngOnDestroy();

      expect(removeListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
      expect(docRemoveListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
  });
});
