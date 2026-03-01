import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PortfolioService } from './services/portfolio.service';
import { ScreenSizeService } from './services/screen-size.service';
import { PLATFORM_ID, Renderer2, Type } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const expect: any;

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let renderer2: Renderer2;
  let portfolioService: PortfolioService;
  let screenSizeService: ScreenSizeService;

  const portfolioServiceMock = {
    articles: []
  };

  const screenSizeServiceMock = {
    isSmall: false,
    isMedium: false,
    isLarge: false
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: PortfolioService, useValue: portfolioServiceMock },
        { provide: ScreenSizeService, useValue: screenSizeServiceMock },
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    renderer2 = fixture.componentRef.injector.get<Renderer2>(Renderer2 as Type<Renderer2>);

    // Mock ElementRef nativeElement for mouseFollower
    component.mouseFollower = {
      nativeElement: document.createElement('div')
    };

    // Spy on Renderer2 methods
    jest.spyOn(renderer2, 'setStyle');
    jest.spyOn(renderer2, 'listen').mockReturnValue(() => {});

    fixture.detectChanges();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'portfolio-website' title`, () => {
    expect(component.title).toEqual('portfolio-website');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Tawsif Kamal');
  });

  it('should setup event listeners in ngAfterViewInit', () => {
    const listenSpy = jest.spyOn(renderer2, 'listen');
    component.ngAfterViewInit();
    expect(listenSpy).toHaveBeenCalledWith(expect.any(Object), 'mousemove', expect.any(Function));
    expect(listenSpy).toHaveBeenCalledWith(window, 'scroll', expect.any(Function));
  });

  it('should update currentSection to ABOUT when scrolling within range', () => {
    component.offsets = { ABOUT: 0, EXPERIENCE: 1000, PROJECTS: 2000 };
    Object.defineProperty(window, 'pageYOffset', { value: 500, writable: true });

    component.onWindowScroll();

    expect(component.currentSection).toBe('ABOUT');
  });

  it('should update currentSection to EXPERIENCE when scrolling within range', () => {
    component.offsets = { ABOUT: 0, EXPERIENCE: 1000, PROJECTS: 2000 };
    Object.defineProperty(window, 'pageYOffset', { value: 1500, writable: true });

    component.onWindowScroll();

    expect(component.currentSection).toBe('EXPERIENCE');
  });

  it('should update currentSection to PROJECTS when scrolling past projects offset', () => {
    component.offsets = { ABOUT: 0, EXPERIENCE: 1000, PROJECTS: 2000 };
    Object.defineProperty(window, 'pageYOffset', { value: 2500, writable: true });

    component.onWindowScroll();

    expect(component.currentSection).toBe('PROJECTS');
  });

  it('should navigate to section using scrollIntoView', () => {
    const mockElement = document.createElement('div');
    mockElement.scrollIntoView = jest.fn();
    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);

    component.navigateToSection('ABOUT');

    expect(mockElement.scrollIntoView).toHaveBeenCalled();
  });
});
