import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockDocument: any;

  beforeEach(async () => {
    const mockStyleElement = {
      style: {},
      setAttribute: jasmine.createSpy('setAttribute'),
      appendChild: jasmine.createSpy('appendChild'),
      sheet: {
        cssRules: [],
        insertRule: jasmine.createSpy('insertRule'),
        deleteRule: jasmine.createSpy('deleteRule')
      }
    };

    const mockHead = {
      appendChild: jasmine.createSpy('appendChild'),
      removeChild: jasmine.createSpy('removeChild'),
      querySelector: jasmine.createSpy('querySelector').and.returnValue(mockStyleElement),
      querySelectorAll: jasmine.createSpy('querySelectorAll').and.returnValue([])
    };

    mockDocument = {
      querySelector: jasmine.createSpy('querySelector').and.callFake((selector) => {
        if (selector === 'head') return mockHead;
        return { style: { display: '' } };
      }),
      querySelectorAll: jasmine.createSpy('querySelectorAll').and.returnValue([]),
      getElementById: jasmine.createSpy('getElementById').and.returnValue({
        offsetTop: 100,
        scrollIntoView: jasmine.createSpy('scrollIntoView')
      }),
      createElement: jasmine.createSpy('createElement').and.returnValue(mockStyleElement),
      documentElement: { scrollTop: 0 },
      head: mockHead,
      body: { 
        scrollTop: 0,
        appendChild: jasmine.createSpy('appendChild'),
        removeChild: jasmine.createSpy('removeChild')
      }
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: DOCUMENT, useValue: mockDocument }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'portfolio-website' title`, () => {
    expect(component.title).toEqual('portfolio-website');
  });

  it('should initialize with ABOUT as current section', () => {
    expect(component.currentSection).toBe('ABOUT');
  });

  it('should have articles array with 4 articles', () => {
    expect(component.articles).toBeDefined();
    expect(component.articles.length).toBe(4);
  });

  it('should have correct article data structure', () => {
    component.articles.forEach(article => {
      expect(article.name).toBeDefined();
      expect(article.link).toBeDefined();
      expect(typeof article.name).toBe('string');
      expect(typeof article.link).toBe('string');
    });
  });

  it('should initialize offsets in ngAfterViewInit', () => {
    component.ngAfterViewInit();
    
    expect(component.offsets.ABOUT).toBeDefined();
    expect(component.offsets.EXPERIENCE).toBeDefined();
    expect(component.offsets.PROJECTS).toBeDefined();
  });

  it('should calculate offset correctly', () => {
    const offset = component['calculateOffset']('ABOUT', 70);
    expect(offset).toBe(30); // 100 (offsetTop) - 70 (padding)
  });

  it('should return 0 when element is not found', () => {
    mockDocument.getElementById.and.returnValue(null);
    const offset = component['calculateOffset']('NONEXISTENT', 70);
    expect(offset).toBe(0);
  });

  it('should navigate to section when navigateToSection is called', () => {
    const mockElement = { scrollIntoView: jasmine.createSpy('scrollIntoView') };
    mockDocument.getElementById.and.returnValue(mockElement);
    
    component.navigateToSection('ABOUT');
    
    expect(mockDocument.getElementById).toHaveBeenCalledWith('ABOUT');
    expect(mockElement.scrollIntoView).toHaveBeenCalled();
  });

  it('should update currentSection to ABOUT when scrolled to ABOUT section', () => {
    component.offsets = { ABOUT: 0, EXPERIENCE: 500, PROJECTS: 1000 };
    
    Object.defineProperty(window, 'pageYOffset', { value: 250, writable: true });
    
    component.onWindowScroll();
    
    expect(component.currentSection).toBe('ABOUT');
  });

  it('should update currentSection to EXPERIENCE when scrolled to EXPERIENCE section', () => {
    component.offsets = { ABOUT: 0, EXPERIENCE: 500, PROJECTS: 1000 };
    
    Object.defineProperty(window, 'pageYOffset', { value: 750, writable: true });
    
    component.onWindowScroll();
    
    expect(component.currentSection).toBe('EXPERIENCE');
  });

  it('should update currentSection to PROJECTS when scrolled to PROJECTS section', () => {
    component.offsets = { ABOUT: 0, EXPERIENCE: 500, PROJECTS: 1000 };
    
    Object.defineProperty(window, 'pageYOffset', { value: 1200, writable: true });
    
    component.onWindowScroll();
    
    expect(component.currentSection).toBe('PROJECTS');
  });

  it('should update mouse follower style on mouse move', () => {
    const mockFollower = { style: { background: '' } };
    spyOn(document, 'querySelector').and.returnValue(mockFollower as any);
    
    const mockEvent = { clientX: 100, clientY: 200 } as MouseEvent;
    component.onMouseMove(mockEvent);
    
    expect(mockFollower.style.background).toContain('radial-gradient');
    expect(mockFollower.style.background).toContain('100px');
    expect(mockFollower.style.background).toContain('200px');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Tawsif Kamal');
  });
});
