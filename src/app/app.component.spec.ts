import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PLATFORM_ID, Renderer2 } from '@angular/core';
import { PortfolioService } from './services/portfolio.service';
import { ScreenSizeService } from './services/screen-size.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockPortfolioService: any;
  let mockScreenSizeService: any;
  let renderer2: Renderer2;

  beforeEach(async () => {
    mockPortfolioService = {
      articles: [],
    };

    mockScreenSizeService = {
      isSmall: false,
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: PortfolioService, useValue: mockPortfolioService },
        {
          provide: ScreenSizeService,
          useValue: mockScreenSizeService,
        },
        {
            provide: BreakpointObserver,
            useValue: {
                observe: () => of({ matches: false }),
            }
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    renderer2 = fixture.componentRef.injector.get(Renderer2);
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

  it('should initialize articles from service', () => {
    expect(component.articles).toBe(mockPortfolioService.articles);
  });

  describe('ngAfterViewInit', () => {
    it('should set up event listeners in browser', () => {
      const listenSpy = jest.spyOn(renderer2, 'listen');

      // Create a mouse follower element to ensure it's found
      const follower = document.createElement('div');
      follower.classList.add('mouse-follower');
      document.body.appendChild(follower);

      fixture.detectChanges(); // This triggers ngAfterViewInit
      component.ngAfterViewInit();

      expect(listenSpy).toHaveBeenCalledWith(window, 'scroll', (expect as any).any(Function));
      expect(listenSpy).toHaveBeenCalledWith(document, 'mousemove', (expect as any).any(Function));

      // Cleanup
      document.body.removeChild(follower);
    });
  });

  describe('onWindowScroll', () => {
    it('should update currentSection based on scroll position', () => {
      component.offsets = {
        ABOUT: 0,
        EXPERIENCE: 500,
        PROJECTS: 1000,
      };

      // Mock window.scrollY
      Object.defineProperty(window, 'scrollY', { value: 600, writable: true });
      // Use logic similar to what's in the component to test the branching
      component.onWindowScroll();
      expect(component.currentSection).toBe('EXPERIENCE');

      Object.defineProperty(window, 'scrollY', { value: 1100, writable: true });
      component.onWindowScroll();
      expect(component.currentSection).toBe('PROJECTS');

      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      component.onWindowScroll();
      expect(component.currentSection).toBe('ABOUT');
    });
  });

  describe('onMouseMove', () => {
    it('should update background style of follower', () => {
      const setStyleSpy = jest.spyOn(renderer2, 'setStyle');
      const follower = document.createElement('div');
      const event = new MouseEvent('mousemove', { clientX: 100, clientY: 200 });

      component.onMouseMove(event, follower);

      expect(setStyleSpy).toHaveBeenCalledWith(
        follower,
        'background',
        (expect as any).stringContaining('radial-gradient')
      );
      expect(setStyleSpy).toHaveBeenCalledWith(
        follower,
        'background',
        (expect as any).stringContaining('100px 200px')
      );
    });
  });

  describe('navigateToSection', () => {
      it('should call scrollIntoView on the element', () => {
          const element = document.createElement('div');
          element.id = 'test-section';
          document.body.appendChild(element);

          // Mock scrollIntoView since it's not implemented in JSDOM
          element.scrollIntoView = jest.fn();
          const scrollSpy = jest.spyOn(element, 'scrollIntoView');

          component.navigateToSection('test-section');

          expect(scrollSpy).toHaveBeenCalled();
          document.body.removeChild(element);
      });
  });

  describe('ngOnDestroy', () => {
    it('should remove event listeners', () => {
      // Mock the unlisten functions
      const unlistenScrollSpy = jest.fn();
      const unlistenMouseMoveSpy = jest.fn();

      // Manually set private properties (using any to bypass TS check)
      (component as any).unlistenScroll = unlistenScrollSpy;
      (component as any).unlistenMouseMove = unlistenMouseMoveSpy;

      component.ngOnDestroy();

      expect(unlistenScrollSpy).toHaveBeenCalled();
      expect(unlistenMouseMoveSpy).toHaveBeenCalled();
    });
  });
});
