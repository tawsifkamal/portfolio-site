import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PortfolioService } from './services/portfolio.service';
import { ScreenSizeService } from './services/screen-size.service';
import { Renderer2 } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';

// Mock Services
class MockPortfolioService {
  articles = {
    update: jest.fn(),
    mutate: jest.fn(),
    set: jest.fn(),
    asReadonly: jest.fn(() => [])
  };
  projects = {
    update: jest.fn(),
    mutate: jest.fn(),
    set: jest.fn(),
    asReadonly: jest.fn(() => [])
  };
  workExperiences = {
    update: jest.fn(),
    mutate: jest.fn(),
    set: jest.fn(),
    asReadonly: jest.fn(() => [])
  };
}

class MockScreenSizeService {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let renderer: Renderer2;

  beforeEach(async () => {
    // Restore mocks to avoid pollution
    jest.restoreAllMocks();

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: PortfolioService, useClass: MockPortfolioService },
        { provide: ScreenSizeService, useClass: MockScreenSizeService },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    renderer = fixture.componentRef.injector.get(Renderer2);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('ngAfterViewInit', () => {
    it('should set offsets and listen to scroll/mousemove in browser', () => {
      const mockElement = document.createElement('div');
      Object.defineProperty(mockElement, 'offsetTop', { value: 100 });
      mockElement.style.display = 'none';

      const getElementByIdSpy = jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);
      const querySelectorSpy = jest.spyOn(document, 'querySelector').mockReturnValue(mockElement);
      const rendererListenSpy = jest.spyOn(renderer, 'listen');

      component.ngAfterViewInit();

      expect(getElementByIdSpy).toHaveBeenCalledWith('ABOUT');
      expect(getElementByIdSpy).toHaveBeenCalledWith('EXPERIENCE');
      expect(getElementByIdSpy).toHaveBeenCalledWith('PROJECTS');
      expect(querySelectorSpy).toHaveBeenCalledWith('.mouse-follower');
      expect(rendererListenSpy).toHaveBeenCalledWith('window', 'scroll', expect.any(Function));
      expect(rendererListenSpy).toHaveBeenCalledWith('document', 'mousemove', expect.any(Function));
    });
  });

  describe('onWindowScroll', () => {
    it('should update currentSection to ABOUT', () => {
        component.offsets = { ABOUT: 0, EXPERIENCE: 500, PROJECTS: 1000 };
        // Mock window.pageYOffset
        Object.defineProperty(window, 'pageYOffset', { value: 200, writable: true });

        component.onWindowScroll();
        expect(component.currentSection).toBe('ABOUT');
    });

    it('should update currentSection to EXPERIENCE', () => {
        component.offsets = { ABOUT: 0, EXPERIENCE: 500, PROJECTS: 1000 };
        Object.defineProperty(window, 'pageYOffset', { value: 700, writable: true });

        component.onWindowScroll();
        expect(component.currentSection).toBe('EXPERIENCE');
    });

    it('should update currentSection to PROJECTS', () => {
        component.offsets = { ABOUT: 0, EXPERIENCE: 500, PROJECTS: 1000 };
        Object.defineProperty(window, 'pageYOffset', { value: 1200, writable: true });

        component.onWindowScroll();
        expect(component.currentSection).toBe('PROJECTS');
    });
  });

  describe('onMouseMove', () => {
    it('should update follower style', () => {
        const mockFollower = { style: { background: '' } };
        (component as any).follower = mockFollower;
        const event = new MouseEvent('mousemove', { clientX: 100, clientY: 200 });

        component.onMouseMove(event);

        expect(mockFollower.style.background).toContain('radial-gradient');
    });
  });

  describe('navigateToSection', () => {
    it('should scroll into view', () => {
        const mockElement = document.createElement('div');
        // JSDOM doesn't implement scrollIntoView, so we must mock it
        mockElement.scrollIntoView = jest.fn();

        jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);

        component.navigateToSection('ABOUT');

        expect(document.getElementById).toHaveBeenCalledWith('ABOUT');
        expect(mockElement.scrollIntoView).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
      it('should remove listeners', () => {
          const unlistenScroll = jest.fn();
          const unlistenMouseMove = jest.fn();
          (component as any).unlistenScroll = unlistenScroll;
          (component as any).unlistenMouseMove = unlistenMouseMove;

          component.ngOnDestroy();

          expect(unlistenScroll).toHaveBeenCalled();
          expect(unlistenMouseMove).toHaveBeenCalled();
      });
  });
});
