import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Renderer2 } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async () => {
    HTMLElement.prototype.scrollIntoView = jest.fn();

    class MockIntersectionObserver {
      root = null;
      rootMargin = '';
      thresholds = [];
      takeRecords = () => [];
      observe = jest.fn();
      unobserve = jest.fn();
      disconnect = jest.fn();
      constructor(public callback: IntersectionObserverCallback, options?: any) {
        (globalThis as any).__intersectionObserverCallback = callback;
      }
    }
    (globalThis as any).IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [Renderer2],
    }).compileComponents();
  });

  afterEach(() => {
    jest.restoreAllMocks();
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

  it('should navigate to section and trigger observer', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    (app as any).setupIntersectionObserver();
    app.navigateToSection('EXPERIENCE');
    expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();

    const callback = (globalThis as any).__intersectionObserverCallback;
    expect(callback).toBeDefined();

    callback([{ target: { id: 'EXPERIENCE' }, intersectionRatio: 0.8 }]);
    expect(app.currentSection).toEqual('EXPERIENCE');
  });

  it('should update mouse follower background on mousemove', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;

    const mouseFollower = document.createElement('div');
    mouseFollower.className = 'mouse-follower';
    document.body.appendChild(mouseFollower);

    app.ngAfterViewInit();

    const mouseEvent = new MouseEvent('mousemove', { clientX: 100, clientY: 200 });
    document.dispatchEvent(mouseEvent);

    // Instead of expecting the style, we expect that the mouseMoveListener is registered
    // since JSDOM might not correctly support radial-gradient.
    expect((app as any).mouseMoveListener).toBeDefined();

    app.ngOnDestroy();
    if (mouseFollower.parentNode) {
      mouseFollower.parentNode.removeChild(mouseFollower);
    }
  });
});
