import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let dummyElement: HTMLElement;

  beforeEach(async () => {
    dummyElement = document.createElement('div');
    dummyElement.classList.add('mouse-follower');
    document.body.appendChild(dummyElement);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  afterEach(() => {
    if (dummyElement) {
      document.body.removeChild(dummyElement);
    }
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should navigate to section', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const scrollIntoViewMock = jest.fn();
    const mockElement = document.createElement('div');
    mockElement.scrollIntoView = scrollIntoViewMock;

    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);

    app.navigateToSection('ABOUT');

    expect(document.getElementById).toHaveBeenCalledWith('ABOUT');
    expect(scrollIntoViewMock).toHaveBeenCalled();

    jest.restoreAllMocks();
  });

  it('should clean up listeners on destroy', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges(); // Calls ngAfterViewInit

    const observerDisconnectSpy = jest.spyOn((app as any).observer, 'disconnect');

    app.ngOnDestroy();

    expect(observerDisconnectSpy).toHaveBeenCalled();
  });

  it('should correctly set the current section when an intersection occurs', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    // We need to capture the callback passed to the IntersectionObserver constructor
    let capturedCallback: IntersectionObserverCallback | undefined;
    const originalIntersectionObserver = globalThis.IntersectionObserver;

    globalThis.IntersectionObserver = class MockIntersectionObserver {
      constructor(callback: IntersectionObserverCallback) {
        capturedCallback = callback;
      }
      readonly root: Element | Document | null = null;
      readonly rootMargin: string = '';
      readonly thresholds: ReadonlyArray<number> = [];
      disconnect() {}
      observe() {}
      takeRecords() { return []; }
      unobserve() {}
    } as unknown as typeof IntersectionObserver;

    // Spy on getElementById to return fake elements for our sections
    const mockElement = document.createElement('div');
    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);

    fixture.detectChanges(); // This will initialize the observer with the mocked one

    expect(capturedCallback).toBeDefined();

    if (capturedCallback) {
      const mockEntry = {
        isIntersecting: true,
        intersectionRatio: 0.8,
        target: { id: 'EXPERIENCE' } as unknown as Element
      } as IntersectionObserverEntry;

      // Simulate the intersection observer firing
      capturedCallback([mockEntry], {} as IntersectionObserver);

      // Verification
      expect(app.currentSection).toBe('EXPERIENCE');
    }

    // Cleanup
    globalThis.IntersectionObserver = originalIntersectionObserver;
    jest.restoreAllMocks();
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
});
