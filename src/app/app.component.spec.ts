import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Renderer2 } from '@angular/core';

describe('AppComponent', () => {
  let originalScrollIntoView: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [Renderer2],
    }).compileComponents();

    if (typeof jest !== 'undefined') {
      originalScrollIntoView = HTMLElement.prototype.scrollIntoView;
      HTMLElement.prototype.scrollIntoView = jest.fn();
    }
  });

  afterEach(() => {
    if (typeof jest !== 'undefined') {
      jest.restoreAllMocks();
      HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
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

  it('should cover IntersectionObserver and set currentSection', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    const mockCallback = (globalThis as any).__intersectionObserverCallback;
    expect(mockCallback).toBeDefined();

    mockCallback([
      { target: { id: 'EXPERIENCE' }, intersectionRatio: 0.8 },
      { target: { id: 'ABOUT' }, intersectionRatio: 0.2 },
    ]);

    expect(app.currentSection).toBe('EXPERIENCE');
  });

  it('should test mousemove listener', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const renderer = fixture.componentRef.injector.get(Renderer2);
    let capturedCallback: any;

    jest.spyOn(renderer, 'listen').mockImplementation((target, eventName, callback) => {
      if (eventName === 'mousemove') {
        capturedCallback = callback;
      }
      return () => {};
    });

    fixture.detectChanges();

    if (capturedCallback) {
      capturedCallback({ clientX: 100, clientY: 200 });
    }

    // Expecting no crash and coverage to be hit
    expect(capturedCallback).toBeDefined();
  });

  it('should navigate to section', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    const dummyElement = document.createElement('div');
    dummyElement.id = 'TEST';
    document.body.appendChild(dummyElement);

    app.navigateToSection('TEST');
    expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  });
});
