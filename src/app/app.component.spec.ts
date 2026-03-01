import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PortfolioService } from './services/portfolio.service';
import { ScreenSizeService } from './services/screen-size.service';
import { Article } from './interfaces/article';
import { DOCUMENT } from '@angular/common';
import { NgZone } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockDocument: Document;
  let mockFollower: HTMLElement;
  let addEventListenerSpy: jest.SpyInstance;
  let windowAddEventListenerSpy: jest.SpyInstance;

  const mockArticles: Article[] = [
    { name: 'Test Article', link: 'http://test.com' }
  ];

  const mockPortfolioService = {
    getArticles: jest.fn().mockReturnValue(mockArticles),
    getProjects: jest.fn().mockReturnValue([]),
    getWorkExperiences: jest.fn().mockReturnValue([])
  };

  const mockScreenSizeService = {
    isSmall: false,
    isMedium: false,
    isLarge: true
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: PortfolioService, useValue: mockPortfolioService },
        { provide: ScreenSizeService, useValue: mockScreenSizeService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    mockDocument = TestBed.inject(DOCUMENT);

    // Mock NgZone
    const ngZone = TestBed.inject(NgZone);
    jest.spyOn(ngZone, 'runOutsideAngular').mockImplementation((fn: any) => fn());
    jest.spyOn(ngZone, 'run').mockImplementation((fn: any) => fn());

    // Mock scrollIntoView
    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    // Spies
    addEventListenerSpy = jest.spyOn(mockDocument, 'addEventListener');
    windowAddEventListenerSpy = jest.spyOn(window, 'addEventListener');

    // Mock follower with mocked style to bypass JSDOM validation
    mockFollower = document.createElement('div');
    mockFollower.classList.add('mouse-follower');
    // Define style as a simple object to capture assignments
    Object.defineProperty(mockFollower, 'style', {
      value: { background: '' },
      writable: true
    });

    jest.spyOn(mockDocument, 'querySelector').mockImplementation((selector) => {
      if (selector === '.mouse-follower') return mockFollower;
      return null;
    });

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

  it('should retrieve articles from PortfolioService', () => {
    expect(component.articles).toEqual(mockArticles);
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Tawsif Kamal');
  });

  it('should navigate to section', () => {
    const mockElement = document.createElement('div');
    mockElement.scrollIntoView = jest.fn();
    jest.spyOn(mockDocument, 'getElementById').mockReturnValue(mockElement);

    component.navigateToSection('ABOUT');

    expect(mockDocument.getElementById).toHaveBeenCalledWith('ABOUT');
    expect(mockElement.scrollIntoView).toHaveBeenCalled();
  });

  it('should setup event listeners in ngAfterViewInit', () => {
    expect(addEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(windowAddEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('should update background on mousemove', () => {
    const event = new MouseEvent('mousemove', { clientX: 100, clientY: 100 });

    // Manually trigger listener to verify logic
    (component as any).mouseMoveListener(event);

    expect(mockFollower.style.background).toContain('radial-gradient');
  });

  it('should update currentSection on scroll', () => {
    component.offsets = {
      ABOUT: 0,
      EXPERIENCE: 400,
      PROJECTS: 800
    };

    Object.defineProperty(window, 'pageYOffset', { value: 500, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 500, configurable: true });

    (component as any).scrollListener();

    expect(component.currentSection).toBe('EXPERIENCE');
  });
});
