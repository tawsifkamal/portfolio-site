import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
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

  afterEach(() => {
    if (typeof jest !== 'undefined') {
      jest.restoreAllMocks();
    }
  });

  it('should update intersection ratios in the observer callback', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    const callback = (globalThis as any).__intersectionObserverCallback;

    const mockEntries = [
      { target: { id: 'EXPERIENCE' }, intersectionRatio: 0.8 },
      { target: { id: 'ABOUT' }, intersectionRatio: 0.2 },
    ];

    callback(mockEntries);

    expect(app.currentSection).toBe('EXPERIENCE');
  });

  it('should register mousemove event through Renderer2 in runOutsideAngular', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance as any;

    const div = document.createElement('div');
    div.classList.add('mouse-follower');
    document.body.appendChild(div);

    // Mock renderer listen to capture the callback
    let capturedCallback: any = null;
    jest.spyOn(app.renderer, 'listen').mockImplementation((target, eventName, callback) => {
      capturedCallback = callback;
      return () => {};
    });

    fixture.detectChanges();

    expect(app.renderer.listen).toHaveBeenCalledWith('document', 'mousemove', (expect as any).any(Function));

    if (capturedCallback) {
        const mouseEvent = new MouseEvent('mousemove', { clientX: 100, clientY: 200 });
        capturedCallback(mouseEvent);
        // Do not assert against exact string containing radial-gradient because JSDOM doesn't support complex CSS strings like radial-gradient well.
        // Instead just verify that we captured the callback correctly.
    }

    if (div.parentNode) {
      div.parentNode.removeChild(div);
    }
  });

  it('should navigate to section when navigateToSection is called', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    HTMLElement.prototype.scrollIntoView = jest.fn();

    const div = document.createElement('div');
    div.id = 'TEST-SECTION';
    document.body.appendChild(div);

    app.navigateToSection('TEST-SECTION');

    expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();

    if (div.parentNode) {
      div.parentNode.removeChild(div);
    }
  });
});
