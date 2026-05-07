import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Renderer2 } from '@angular/core';

describe('AppComponent', () => {
  let renderer: Renderer2;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [Renderer2],
    }).compileComponents();

    if (typeof jest !== 'undefined') {
      jest.restoreAllMocks();
    }
    HTMLElement.prototype.scrollIntoView = jest.fn();
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

  it('should handle navigation', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    // Add a dummy section to DOM for navigation
    const dummySection = document.createElement('div');
    dummySection.id = 'EXPERIENCE';
    document.body.appendChild(dummySection);

    app.navigateToSection('EXPERIENCE');
    expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();

    if (dummySection.parentNode) {
      dummySection.parentNode.removeChild(dummySection);
    }
  });

  it('should register mousemove listener and update style', () => {
    const fixture = TestBed.createComponent(AppComponent);

    // Add mouse follower to DOM
    const follower = document.createElement('div');
    follower.classList.add('mouse-follower');
    document.body.appendChild(follower);

    let mouseMoveCallback: any;
    renderer = fixture.componentRef.injector.get(Renderer2);
    jest.spyOn(renderer, 'listen').mockImplementation((target, eventName, callback) => {
      if (eventName === 'mousemove') {
        mouseMoveCallback = callback;
      }
      return () => {};
    });

    fixture.detectChanges();

    expect(renderer.listen).toHaveBeenCalledWith('document', 'mousemove', (expect as any).any(Function));

    mouseMoveCallback({ clientX: 100, clientY: 200 } as MouseEvent);

    if (follower.parentNode) {
      follower.parentNode.removeChild(follower);
    }
  });

  it('should update currentSection when intersection observer fires', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    const cb = (globalThis as any).__intersectionObserverCallback;
    expect(cb).toBeDefined();

    cb([
      { target: { id: 'PROJECTS' }, intersectionRatio: 0.8 },
      { target: { id: 'ABOUT' }, intersectionRatio: 0.2 },
    ]);

    expect(app.currentSection).toBe('PROJECTS');
  });
});
