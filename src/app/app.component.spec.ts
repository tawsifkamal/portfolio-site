import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let mouseFollower: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    mouseFollower = document.createElement('div');
    mouseFollower.classList.add('mouse-follower');
    document.body.appendChild(mouseFollower);
  });

  afterEach(() => {
    if (mouseFollower) {
      document.body.removeChild(mouseFollower);
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

  it('should navigate to section and scroll into view', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    const mockElement = document.createElement('div');
    mockElement.id = 'TEST_SECTION';
    mockElement.scrollIntoView = jest.fn();
    document.body.appendChild(mockElement);
    const scrollIntoViewSpy = jest.spyOn(mockElement, 'scrollIntoView');

    app.navigateToSection('TEST_SECTION');
    expect(scrollIntoViewSpy).toHaveBeenCalled();

    document.body.removeChild(mockElement);
  });

  it('should update currentSection based on IntersectionObserver', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges(); // This will call ngAfterViewInit and setup IntersectionObserver

    // Get the captured callback
    const observerCallback = (globalThis as any).__intersectionObserverCallback;
    expect(observerCallback).toBeDefined();

    // Simulate an intersection event
    const mockEntries = [
      {
        target: { id: 'EXPERIENCE' },
        intersectionRatio: 0.8,
      },
      {
        target: { id: 'PROJECTS' },
        intersectionRatio: 0.2,
      }
    ] as any;

    observerCallback(mockEntries);

    expect(app.currentSection).toBe('EXPERIENCE');
  });
});
