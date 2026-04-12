import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Renderer2 } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  afterEach(() => {
    if (typeof jest !== 'undefined') {
      jest.restoreAllMocks();
    }
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'portfolio-website' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('portfolio-website');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Tawsif Kamal');
  });

  it('should register mousemove event listener with Renderer2 outside Angular zone', () => {
    const fixture = TestBed.createComponent(AppComponent);

    // Mock Renderer2 listen
    const renderer = fixture.debugElement.injector.get(Renderer2);
    let capturedCallback: ((e: MouseEvent) => boolean | void) | undefined;
    const listenSpy = jest.spyOn(renderer, 'listen').mockImplementation((target, eventName, callback) => {
      if (eventName === 'mousemove') {
        capturedCallback = callback as (e: MouseEvent) => boolean | void;
      }
      return () => {}; // return unlisten fn
    });

    fixture.detectChanges(); // calls ngAfterViewInit

    expect(listenSpy).toHaveBeenCalledWith('document', 'mousemove', (expect as any).any(Function));

    // Verify callback executes without errors (JSDOM handles radial-gradient poorly, so we just test execution)
    expect(capturedCallback).toBeDefined();
    if (capturedCallback) {
      const cb = capturedCallback;
      expect(() => {
        cb({ clientX: 100, clientY: 200 } as MouseEvent);
      }).not.toThrow();
    }
  });

  it('should update currentSection based on IntersectionObserver threshold ratio', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    fixture.detectChanges();

    // Trigger observer callback
    const callback = (globalThis as any).__intersectionObserverCallback;
    expect(callback).toBeDefined();

    callback([
      { target: { id: 'ABOUT' }, intersectionRatio: 0.2 },
      { target: { id: 'EXPERIENCE' }, intersectionRatio: 0.8 },
      { target: { id: 'PROJECTS' }, intersectionRatio: 0.1 }
    ]);

    expect(app.currentSection).toBe('EXPERIENCE');
  });

  it('should navigate to section using scrollIntoView', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    const aboutSection = document.getElementById('ABOUT');
    if (aboutSection) {
      const scrollIntoViewSpy = jest.spyOn(aboutSection, 'scrollIntoView');

      app.navigateToSection('ABOUT');

      expect(scrollIntoViewSpy).toHaveBeenCalledWith({ behavior: 'smooth' });
    }
  });
});
