import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PortfolioService } from './services/portfolio.service';
import { ScreenSizeService } from './services/screen-size.service';
import { of } from 'rxjs';
import { NgZone } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let portfolioServiceMock: any;
  let screenSizeServiceMock: any;
  let ngZone: NgZone;

  beforeEach(async () => {
    portfolioServiceMock = {
      articles: [
        { name: 'Article 1', link: 'http://link1.com' }
      ]
    };

    screenSizeServiceMock = {
      isSmallScreen$: of(false)
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: PortfolioService, useValue: portfolioServiceMock },
        { provide: ScreenSizeService, useValue: screenSizeServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    ngZone = TestBed.inject(NgZone);

    // Mock getElementById to return an element with offsetTop
    jest.spyOn(document, 'getElementById').mockImplementation((id) => {
      const el = document.createElement('div');
      Object.defineProperty(el, 'offsetTop', { value: 100 });
      return el;
    });

    // Mock querySelector for mouse follower
    jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
      if (selector === '.mouse-follower') {
        return document.createElement('div');
      }
      return null;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create the app', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should initialize articles from service', () => {
    fixture.detectChanges();
    expect(component.articles.length).toBe(1);
    expect(component.articles[0].name).toBe('Article 1');
  });

  it('should calculate offsets on ngAfterViewInit', () => {
    fixture.detectChanges();
    expect(component.offsets.ABOUT).toBe(30); // 100 - 70
    expect(component.offsets.EXPERIENCE).toBe(30);
    expect(component.offsets.PROJECTS).toBe(30);
  });

  it('should setup mouse follower listener in runOutsideAngular', () => {
    const runOutsideAngularSpy = jest.spyOn(ngZone, 'runOutsideAngular');
    fixture.detectChanges();
    expect(runOutsideAngularSpy).toHaveBeenCalled();
  });

  it('should scroll to section', () => {
    fixture.detectChanges();
    const scrollSpy = jest.fn();
    jest.spyOn(document, 'getElementById').mockImplementation((id) => {
      const el = document.createElement('div');
      el.scrollIntoView = scrollSpy;
      return el;
    });

    component.navigateToSection('EXPERIENCE');
    expect(scrollSpy).toHaveBeenCalled();
  });

  it('should update currentSection on scroll', () => {
    fixture.detectChanges();
    const runSpy = jest.spyOn(ngZone, 'run');

    // Setup offsets
    component.offsets = {
      ABOUT: 0,
      EXPERIENCE: 500,
      PROJECTS: 1000
    };

    // Mock window.pageYOffset or scrollTop
    Object.defineProperty(window, 'pageYOffset', { value: 600, configurable: true });

    component.checkScroll();
    expect(component.currentSection).toBe('EXPERIENCE');
    expect(runSpy).toHaveBeenCalled();
  });

  it('should set section to ABOUT if scroll is small', () => {
    fixture.detectChanges();
    component.offsets = { ABOUT: 0, EXPERIENCE: 500, PROJECTS: 1000 };
    Object.defineProperty(window, 'pageYOffset', { value: 100, configurable: true });

    component.checkScroll();
    expect(component.currentSection).toBe('ABOUT');
  });

  it('should set section to PROJECTS if scroll is large', () => {
    fixture.detectChanges();
    component.offsets = { ABOUT: 0, EXPERIENCE: 500, PROJECTS: 1000 };
    Object.defineProperty(window, 'pageYOffset', { value: 1500, configurable: true });

    component.checkScroll();
    expect(component.currentSection).toBe('PROJECTS');
  });
});
