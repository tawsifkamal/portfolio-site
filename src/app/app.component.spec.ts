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

  it('should trigger navigation on click', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    jest.spyOn(document, 'getElementById').mockReturnValue({
      scrollIntoView: jest.fn()
    } as unknown as HTMLElement);

    app.navigateToSection('ABOUT');

    expect(document.getElementById).toHaveBeenCalledWith('ABOUT');

    jest.restoreAllMocks();
  });

  it('should process intersection entries', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    // Simulate AfterViewInit setup
    app.ngAfterViewInit();

    expect(app['observer']).toBeTruthy();

    if (app['observer']) {
        const mockEntry1 = { target: { id: 'EXPERIENCE' }, intersectionRatio: 0.8 } as IntersectionObserverEntry;
        const mockEntry2 = { target: { id: 'ABOUT' }, intersectionRatio: 0.1 } as IntersectionObserverEntry;
        const callback = (app['observer'] as unknown as { callback: Function }).callback;

        callback([mockEntry1, mockEntry2], app['observer']);

        expect(app.currentSection).toBe('EXPERIENCE');
    }
  });


  it('should properly clean up listeners on destroy', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    // Simulate AfterViewInit setup
    app.ngAfterViewInit();

    // Test observer clean up exists
    expect(app['observer']).toBeTruthy();

    // Call OnDestroy and make sure we don't throw
    app.ngOnDestroy();
  });
});
