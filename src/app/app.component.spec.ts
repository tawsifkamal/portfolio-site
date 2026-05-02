import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Renderer2 } from '@angular/core';

describe('AppComponent', () => {
  let mockRendererListenCallback: (e: MouseEvent) => void;

  beforeEach(async () => {
    HTMLElement.prototype.scrollIntoView = jest.fn();

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [Renderer2],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    const renderer = fixture.componentRef.injector.get(Renderer2);
    jest.spyOn(renderer, 'listen').mockImplementation((target, eventName, callback) => {
      if (eventName === 'mousemove') {
        mockRendererListenCallback = callback;
      }
      return () => {};
    });
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

  it('should handle mousemove events via Renderer2', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // Triggers ngAfterViewInit

    const e = new MouseEvent('mousemove', { clientX: 100, clientY: 200 });
    expect(mockRendererListenCallback).toBeDefined();

    // Call the callback. If it throws, the test will fail.
    mockRendererListenCallback(e);
  });

  it('should update currentSection when IntersectionObserver fires', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges(); // Triggers ngOnInit and setupIntersectionObserver

    const callback = (globalThis as any).__intersectionObserverCallback;
    expect(callback).toBeDefined();

    // Simulate EXPERIENCE section intersecting the most
    callback([
      { target: { id: 'ABOUT' }, intersectionRatio: 0.1 },
      { target: { id: 'EXPERIENCE' }, intersectionRatio: 0.8 },
      { target: { id: 'PROJECTS' }, intersectionRatio: 0.2 },
    ]);

    expect(app.currentSection).toEqual('EXPERIENCE');
  });

  it('should calculate section offsets and navigate to sections', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    expect(app.offsets.ABOUT).toBeDefined();

    const spy = jest.spyOn(HTMLElement.prototype, 'scrollIntoView');
    app.navigateToSection('ABOUT');
    expect(spy).toHaveBeenCalled();
  });
});
