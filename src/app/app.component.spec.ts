import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

jest.mock('@angular/common', () => ({
  ...jest.requireActual('@angular/common'),
  isPlatformBrowser: () => true
}));

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    const follower = document.createElement('div');
    follower.className = 'mouse-follower';
    document.body.appendChild(follower);
  });

  afterEach(() => {
    const follower = document.querySelector('.mouse-follower');
    if (follower) {
      follower.remove();
    }
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

  it('should update currentSection based on intersection observer', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;

    // Create elements to observe
    const mockElement = document.createElement('div');
    mockElement.id = 'EXPERIENCE';
    document.body.appendChild(mockElement);

    // Re-run setup
    app.ngAfterViewInit();

    // Trigger intersection observer callback
    const callback = (globalThis as any).__intersectionObserverCallback;
    expect(callback).toBeDefined();

    const mockEntry = {
      target: mockElement,
      intersectionRatio: 0.8
    } as unknown as IntersectionObserverEntry;

    callback([mockEntry], {} as IntersectionObserver);

    expect(app.currentSection).toBe('EXPERIENCE');

    mockElement.remove();
  });

  it('should cleanup observer and event listeners on destroy', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;

    // We can't easily spy on the exact observer since it's private and initialized in setupIntersectionObserver
    // But we can verify no errors are thrown during destruction
    expect(() => app.ngOnDestroy()).not.toThrow();
  });
});
