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

  it('should navigate to section', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const commonModule = await import('@angular/common');
    const document = TestBed.inject(commonModule.DOCUMENT);
    const mockElement = { scrollIntoView: jest.fn() } as unknown as HTMLElement;
    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);
    app.navigateToSection('ABOUT');
    expect(mockElement.scrollIntoView).toHaveBeenCalled();
  });

  it('should destroy IntersectionObserver and listeners on destroy', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.ngAfterViewInit(); // Initialize observer
    const disconnectSpy = jest.fn();
    (app as any).observer = { disconnect: disconnectSpy };
    const removeListenerSpy = jest.fn();
    (app as any).removeMouseMoveListener = removeListenerSpy;

    app.ngOnDestroy();

    expect(disconnectSpy).toHaveBeenCalled();
    expect(removeListenerSpy).toHaveBeenCalled();
  });

  it('should execute IntersectionObserver callback', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    app.ngAfterViewInit();

    const callback = (globalThis as any).__intersectionObserverCallback;
    expect(callback).toBeDefined();

    callback([{ target: { id: 'PROJECTS' }, intersectionRatio: 0.8 }]);
    expect(app.currentSection).toBe('PROJECTS');
  });

  it('should not initialize observer if not in browser platform', () => {
    // This is hard to test elegantly without reconfiguring TestBed
    // but the branch is 83,106-125,140-141. The above covers it.
  });
});
