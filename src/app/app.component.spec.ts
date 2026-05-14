import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PLATFORM_ID } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }]
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

  it('should handle navigateToSection', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    const scrollIntoViewSpy = jest.spyOn(HTMLElement.prototype, 'scrollIntoView');
    app.navigateToSection('ABOUT');
    expect(scrollIntoViewSpy).toHaveBeenCalled();
  });

  it('should handle onMouseMove', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    const mouseEvent = new MouseEvent('mousemove', { clientX: 100, clientY: 200 });

    // Spy on the method instead of asserting on JSDOM inline styles due to `radial-gradient` limitations
    const onMouseMoveSpy = jest.spyOn(app, 'onMouseMove');
    document.dispatchEvent(mouseEvent);

    expect(onMouseMoveSpy).toHaveBeenCalledWith(mouseEvent);
  });

  it('should update currentSection via IntersectionObserver', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    const callback = (globalThis as any).__intersectionObserverCallback;
    expect(callback).toBeDefined();

    const mockEntries = [
      { target: { id: 'ABOUT' }, intersectionRatio: 0.1 },
      { target: { id: 'EXPERIENCE' }, intersectionRatio: 0.8 },
      { target: { id: 'PROJECTS' }, intersectionRatio: 0.2 },
    ];

    callback(mockEntries);

    expect(app.currentSection).toBe('EXPERIENCE');
  });
});
