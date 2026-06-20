import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ScreenSizeService } from './services/screen-size.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockBreakpointObserver: jest.Mocked<BreakpointObserver>;

  beforeEach(async () => {
    // Mock BreakpointObserver
    mockBreakpointObserver = {
      observe: jest.fn().mockReturnValue(of({ matches: false }))
    } as any;

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: BreakpointObserver, useValue: mockBreakpointObserver },
        ScreenSizeService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
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
    // Mock document.getElementById for this test
    const mockElement = { offsetTop: 100 };
    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement as any);
    jest.spyOn(document, 'querySelector').mockReturnValue({ style: { display: '' } } as any);
    
    component.ngAfterViewInit();
    
    expect(component.offsets.ABOUT).toBeDefined();
    expect(component.offsets.EXPERIENCE).toBeDefined();
    expect(component.offsets.PROJECTS).toBeDefined();
  });

  it('should calculate offset correctly', () => {
    const mockElement = { offsetTop: 100 };
    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement as any);
    
    const offset = component['calculateOffset']('ABOUT', 70);
    expect(offset).toBe(30); // 100 (offsetTop) - 70 (padding)
  });

  it('should return 0 when element is not found', () => {
    jest.spyOn(document, 'getElementById').mockReturnValue(null);
    const offset = component['calculateOffset']('NONEXISTENT', 70);
    expect(offset).toBe(0);
  });

  it('should navigate to section when navigateToSection is called', () => {
    const mockElement = { scrollIntoView: jest.fn() };
    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement as any);
    
    component.navigateToSection('ABOUT');
    
    expect(document.getElementById).toHaveBeenCalledWith('ABOUT');
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
