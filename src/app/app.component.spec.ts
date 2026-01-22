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
      setAttribute: jest.fn(),
      appendChild: jest.fn(),
      sheet: {
        cssRules: [],
        insertRule: jest.fn(),
        deleteRule: jest.fn()
      }
    };

    const mockElement = {
      style: { display: '' },
      setAttribute: jest.fn(),
      appendChild: jest.fn(),
      removeChild: jest.fn(),
      offsetTop: 100,
      scrollIntoView: jest.fn()
    };

    const mockHead = {
      appendChild: jest.fn(),
      removeChild: jest.fn(),
      querySelector: jest.fn().mockReturnValue(mockStyleElement),
      querySelectorAll: jest.fn().mockReturnValue([])
    };

    // Create a proper window mock
    const mockWindow = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      pageYOffset: 0,
      document: null as any // Will be set after mockDocument is created
    };

    mockDocument = {
      querySelector: jest.fn().mockImplementation((selector) => {
        if (selector === 'head') return mockHead;
        return mockElement;
      }),
      querySelectorAll: jest.fn().mockReturnValue([]),
      getElementById: jest.fn().mockReturnValue(mockElement),
      createElement: jest.fn().mockReturnValue(mockStyleElement),
      documentElement: { scrollTop: 0 },
      head: mockHead,
      body: { 
        scrollTop: 0,
        appendChild: jest.fn(),
        removeChild: jest.fn(),
        setAttribute: jest.fn()
      },
      defaultView: mockWindow,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    };

    // Set up the circular reference
    mockWindow.document = mockDocument;

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
    mockDocument.getElementById.mockReturnValue(null);
    const offset = component['calculateOffset']('NONEXISTENT', 70);
    expect(offset).toBe(0);
  });

  it('should navigate to section when navigateToSection is called', () => {
    const mockElement = { scrollIntoView: jest.fn() };
    mockDocument.getElementById.mockReturnValue(mockElement);
    
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
    jest.spyOn(document, 'querySelector').mockReturnValue(mockFollower as any);
    
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
