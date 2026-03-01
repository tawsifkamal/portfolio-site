import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PLATFORM_ID } from '@angular/core';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

  it('should have articles loaded', () => {
    expect(component.articles.length).toBeGreaterThan(0);
  });

  it('should update currentSection based on scroll position', () => {
    // Mock offsets
    component.offsets = {
      ABOUT: 0,
      EXPERIENCE: 500,
      PROJECTS: 1000
    };

    // Test ABOUT section
    Object.defineProperty(window, 'pageYOffset', { value: 100, writable: true });
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 100, writable: true });
    Object.defineProperty(document.body, 'scrollTop', { value: 100, writable: true });
    component.onWindowScroll();
    expect(component.currentSection).toBe('ABOUT');

    // Test EXPERIENCE section
    Object.defineProperty(window, 'pageYOffset', { value: 600, writable: true });
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 600, writable: true });
    Object.defineProperty(document.body, 'scrollTop', { value: 600, writable: true });
    component.onWindowScroll();
    expect(component.currentSection).toBe('EXPERIENCE');

    // Test PROJECTS section
    Object.defineProperty(window, 'pageYOffset', { value: 1200, writable: true });
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 1200, writable: true });
    Object.defineProperty(document.body, 'scrollTop', { value: 1200, writable: true });
    component.onWindowScroll();
    expect(component.currentSection).toBe('PROJECTS');
  });

  it('should navigate to section', () => {
    const mockElement = document.createElement('div');
    mockElement.scrollIntoView = jest.fn();
    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);

    component.navigateToSection('ABOUT');
    expect(document.getElementById).toHaveBeenCalledWith('ABOUT');
    expect(mockElement.scrollIntoView).toHaveBeenCalled();
  });

  it('should update mouse follower background on mouse move', () => {
    // Mock the follower element completely
    const mockFollower = {
      style: {
        background: '',
        display: ''
      }
    } as any;

    // Force component to use our mock
    jest.spyOn(document, 'querySelector').mockReturnValue(mockFollower);

    // Call onMouseMove directly with a mock event
    const event = { clientX: 100, clientY: 100 } as MouseEvent;

    component.onMouseMove(event);

    // Verify style update on our mock object
    expect(mockFollower.style.background).toContain('radial-gradient');

    jest.restoreAllMocks();
  });
});
