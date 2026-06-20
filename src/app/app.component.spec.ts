import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Renderer2 } from '@angular/core';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  afterEach(() => {
    if (typeof jest !== 'undefined') {
      jest.restoreAllMocks();
    }
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have the 'portfolio-website' title`, () => {
    expect(app.title).toEqual('portfolio-website');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Tawsif Kamal');
  });

  it('should handle navigation', () => {
    fixture.detectChanges();
    const spy = jest.spyOn(document.getElementById('ABOUT')!, 'scrollIntoView');
    app.navigateToSection('ABOUT');
    expect(spy).toHaveBeenCalled();
  });

  it('should handle mousemove and scroll', () => {
    let mouseMoveCallback: any;
    const renderer2 = fixture.debugElement.injector.get(Renderer2);
    jest.spyOn(renderer2, 'listen').mockImplementation((target, eventName, callback) => {
      if (eventName === 'mousemove') {
        mouseMoveCallback = callback;
      }
      return () => {};
    });

    fixture.detectChanges();

    if (mouseMoveCallback) {
      const e = new MouseEvent('mousemove', { clientX: 100, clientY: 100 });
      mouseMoveCallback(e);
    }

    const callback = (globalThis as any).__intersectionObserverCallback;
    if (callback) {
      callback([{
        target: { id: 'PROJECTS' },
        intersectionRatio: 0.8
      }]);
      expect(app.currentSection).toBe('PROJECTS');
    }
  });
});
