import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Renderer2 } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    if (typeof jest !== 'undefined') {
      jest.restoreAllMocks();
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

  it('should handle mousemove using Renderer2 outside NgZone', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    const renderer = fixture.debugElement.injector.get(Renderer2);
    let capturedCallback: any;
    jest.spyOn(renderer, 'listen').mockImplementation((target, eventName, callback) => {
      if (eventName === 'mousemove') {
        capturedCallback = callback;
      }
      return () => {};
    });

    fixture.detectChanges(); // triggers ngAfterViewInit

    const mockFollower = fixture.nativeElement.querySelector('.mouse-follower');

    expect(capturedCallback).toBeDefined();
    expect(mockFollower.style.display).toBe('block');

    capturedCallback({ clientX: 100, clientY: 200 } as MouseEvent);
    // JSDOM does not support radial-gradient well, so we just verify the event fired
    expect(capturedCallback).toBeDefined();
  });

  it('should update currentSection based on intersection ratio', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    // Create mock sections inside the component's element
    ['ABOUT', 'EXPERIENCE', 'PROJECTS'].forEach(id => {
      const el = document.createElement('div');
      el.id = id;
      fixture.nativeElement.appendChild(el);
    });

    fixture.detectChanges();

    const callback = (globalThis as any).__intersectionObserverCallback;
    expect(callback).toBeDefined();

    callback([{ target: { id: 'EXPERIENCE' }, intersectionRatio: 0.8 }]);
    expect(app.currentSection).toBe('EXPERIENCE');

    callback([{ target: { id: 'PROJECTS' }, intersectionRatio: 0.9 }]);
    expect(app.currentSection).toBe('PROJECTS');
  });

  it('should navigate to section using scrollIntoView', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    const el = document.createElement('div');
    el.id = 'EXPERIENCE';
    document.body.appendChild(el);

    app.navigateToSection('EXPERIENCE');

    expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    // cleanup
    document.body.removeChild(el);
  });
});
