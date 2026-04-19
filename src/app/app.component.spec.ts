import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ElementRef, PLATFORM_ID, NgZone, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

describe('AppComponent', () => {
  let originalIntersectionObserver: any;

  beforeEach(async () => {
    originalIntersectionObserver = (globalThis as any).IntersectionObserver;
    (globalThis as any).IntersectionObserver = class {
      constructor(public callback: any, public options: any) {
        (globalThis as any).__intersectionObserverCallback = callback;
      }
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() { return []; }
      root = null;
      rootMargin = '';
      thresholds = [];
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    }).compileComponents();
  });

  afterEach(() => {
    (globalThis as any).IntersectionObserver = originalIntersectionObserver;
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
    expect(compiled.querySelector('.name')?.textContent).toContain('Tawsif Kamal');
  });

  it('should update currentSection based on IntersectionObserver callback', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;

    const mockEntries = [
      { target: { id: 'ABOUT' }, intersectionRatio: 0.1 },
      { target: { id: 'EXPERIENCE' }, intersectionRatio: 0.8 },
      { target: { id: 'PROJECTS' }, intersectionRatio: 0.0 }
    ];

    const callback = (globalThis as any).__intersectionObserverCallback;
    callback(mockEntries);
    expect(app.currentSection).toBe('EXPERIENCE');
  });

  it('should unlisten to mousemove on destroy', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    const unlistenSpy = jest.fn();
    (app as any).unlistenMouseMove = unlistenSpy;
    app.ngOnDestroy();
    expect(unlistenSpy).toHaveBeenCalled();
  });

  it('should attach mousemove listener to document', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const renderer = fixture.componentRef.injector.get(Renderer2);
    let capturedCallback: any;
    jest.spyOn(renderer, 'listen').mockImplementation((target, event, callback) => {
      if (event === 'mousemove') {
        capturedCallback = callback;
      }
      return () => {};
    });

    fixture.detectChanges();

    expect(renderer.listen).toHaveBeenCalledWith('document', 'mousemove', (expect as any).any(Function));

    const mockEvent = new MouseEvent('mousemove', { clientX: 100, clientY: 200 });
    capturedCallback(mockEvent); // Execute callback for coverage
  });

  it('should navigate to section', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    const document = fixture.componentRef.injector.get(DOCUMENT);
    const mockEl = { scrollIntoView: jest.fn() };
    jest.spyOn(document, 'getElementById').mockReturnValue(mockEl as any);

    app.navigateToSection('TEST');
    expect(mockEl.scrollIntoView).toHaveBeenCalled();
  });
});
