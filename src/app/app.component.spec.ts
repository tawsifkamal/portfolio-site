import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Renderer2, PLATFORM_ID } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [Renderer2, { provide: PLATFORM_ID, useValue: 'browser' }],
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

  it('should set up IntersectionObserver and mousemove listener', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const renderer = fixture.componentRef.injector.get(Renderer2);
    const listenSpy = jest.spyOn(renderer, 'listen').mockImplementation((target, event, callback) => {
      if (event === 'mousemove') {
        const mockEvent = new MouseEvent('mousemove', { clientX: 100, clientY: 200 });
        callback(mockEvent);
      }
      return () => {};
    });

    HTMLElement.prototype.scrollIntoView = jest.fn();

    fixture.detectChanges();

    const app = fixture.componentInstance;
    expect(listenSpy).toHaveBeenCalledWith((expect as any).anything(), 'mousemove', (expect as any).any(Function));

    app.navigateToSection('ABOUT');
    expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();

    app.ngOnDestroy();
  });

  it('should handle scroll-spy intersection callback', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;

    const callback = (globalThis as any).__intersectionObserverCallback;
    expect(callback).toBeDefined();

    callback([{ target: { id: 'PROJECTS' }, intersectionRatio: 0.8 }]);

    expect(app.currentSection).toEqual('PROJECTS');
  });
});
