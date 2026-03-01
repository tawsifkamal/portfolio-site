import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ScreenSizeService } from './services/screen-size.service';
import { PortfolioService } from './services/portfolio.service';
import { NgZone, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

jest.mock('@angular/common', () => {
  const originalModule = jest.requireActual('@angular/common');
  return {
    ...originalModule,
    isPlatformBrowser: jest.fn()
  };
});

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let ngZone: NgZone;
  let renderer: Renderer2;
  let portfolioService: PortfolioService;

  beforeEach(async () => {
    // Default to browser environment
    (isPlatformBrowser as jest.Mock).mockReturnValue(true);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        PortfolioService,
        ScreenSizeService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    ngZone = TestBed.inject(NgZone);
    renderer = component['renderer']; // Access private renderer
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize offsets and mouse follower on AfterViewInit in browser', () => {
    // Mock elements
    const mockFollower = document.createElement('div');
    jest.spyOn(document, 'querySelector').mockReturnValue(mockFollower);
    jest.spyOn(document, 'getElementById').mockReturnValue(document.createElement('div'));

    const rendererSetStyleSpy = jest.spyOn(renderer, 'setStyle');
    const ngZoneSpy = jest.spyOn(ngZone, 'runOutsideAngular');

    component.ngAfterViewInit();

    expect(component.offsets.ABOUT).toBeDefined();
    expect(rendererSetStyleSpy).toHaveBeenCalledWith(mockFollower, 'display', 'block');
    expect(ngZoneSpy).toHaveBeenCalled();
  });

  it('should not initialize offsets or mouse follower on AfterViewInit if not in browser', () => {
     (isPlatformBrowser as jest.Mock).mockReturnValue(false);
     const rendererSetStyleSpy = jest.spyOn(renderer, 'setStyle');

     component.ngAfterViewInit();

     expect(rendererSetStyleSpy).not.toHaveBeenCalled();
  });

  it('should navigate to section in browser', () => {
    const mockElement = document.createElement('div');
    mockElement.scrollIntoView = jest.fn();
    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);

    component.navigateToSection('ABOUT');

    expect(document.getElementById).toHaveBeenCalledWith('ABOUT');
    expect(mockElement.scrollIntoView).toHaveBeenCalled();
  });

  it('should not navigate to section if not in browser', () => {
    (isPlatformBrowser as jest.Mock).mockReturnValue(false);
    jest.spyOn(document, 'getElementById');

    component.navigateToSection('ABOUT');

    expect(document.getElementById).not.toHaveBeenCalled();
  });

  it('should update currentSection on window scroll in browser', () => {
    component.offsets = { ABOUT: 0, EXPERIENCE: 100, PROJECTS: 200 };

    // Test EXPERIENCE section
    Object.defineProperty(window, 'pageYOffset', { value: 150, writable: true });
    component.onWindowScroll();
    expect(component.currentSection).toBe('EXPERIENCE');

    // Test ABOUT section
    Object.defineProperty(window, 'pageYOffset', { value: 50, writable: true });
    component.onWindowScroll();
    expect(component.currentSection).toBe('ABOUT');

    // Test PROJECTS section
    Object.defineProperty(window, 'pageYOffset', { value: 250, writable: true });
    component.onWindowScroll();
    expect(component.currentSection).toBe('PROJECTS');
  });

   it('should not update currentSection on window scroll if not in browser', () => {
    (isPlatformBrowser as jest.Mock).mockReturnValue(false);
    const initialSection = component.currentSection;

    Object.defineProperty(window, 'pageYOffset', { value: 150, writable: true });
    component.onWindowScroll();

    expect(component.currentSection).toBe(initialSection);
  });

  it('should cleanup mouse move listener on destroy', () => {
    // Setup the listener first
    const mockFollower = document.createElement('div');
    jest.spyOn(document, 'querySelector').mockReturnValue(mockFollower);
    const removeListenerSpy = jest.fn();
    jest.spyOn(renderer, 'listen').mockReturnValue(removeListenerSpy);

    component.ngAfterViewInit(); // This sets up mouseMoveCleanup

    component.ngOnDestroy();

    expect(removeListenerSpy).toHaveBeenCalled();
  });
});
