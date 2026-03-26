import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID, Renderer2 } from '@angular/core';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
    const mouseFollower = document.createElement('div');
    mouseFollower.classList.add('mouse-follower');
    document.body.appendChild(mouseFollower);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    const mouseFollower = document.querySelector('.mouse-follower');
    if (mouseFollower && mouseFollower.parentNode) {
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

  it('should handle navigation to section', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    // Create a dummy element to scroll to
    const section = document.createElement('div');
    section.id = 'ABOUT';
    document.body.appendChild(section);

    // Mock scrollIntoView
    (section as any).scrollIntoView = jest.fn();

    // Mock document.getElementById to return our dummy element
    jest.spyOn(document, 'getElementById').mockReturnValue(section);

    app.navigateToSection('ABOUT');

    expect(section.scrollIntoView).toHaveBeenCalled();

    document.body.removeChild(section);
    jest.restoreAllMocks();
  });

  it('should return early from ngAfterViewInit if not platform browser', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: PLATFORM_ID, useValue: 'server' }
      ]
    }).compileComponents();
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    jest.spyOn(document, 'querySelector');
    app.ngAfterViewInit();
    expect(document.querySelector).not.toHaveBeenCalled();
  });

  it('should update currentSection when intersectionRatio is greater than 0', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.currentSection = 'ABOUT';

    // Mock document.getElementById to return a dummy element
    const dummyElement = document.createElement('div');
    jest.spyOn(document, 'getElementById').mockReturnValue(dummyElement);

    app.ngAfterViewInit();

    // Trigger the callback that we captured in setup-jest.ts
    const callback = (globalThis as any).__intersectionObserverCallback;
    if (callback) {
      // First, trigger a callback with no max ratio (should not update)
      callback([
        { target: { id: 'ABOUT' }, intersectionRatio: 0 }
      ]);
      expect(app.currentSection).toEqual('ABOUT');

      // Trigger one with a lower ratio than the maximum
      callback([
        { target: { id: 'PROJECTS' }, intersectionRatio: 0.8 },
        { target: { id: 'EXPERIENCE' }, intersectionRatio: 0.4 }
      ]);
      expect(app.currentSection).toEqual('PROJECTS');

      // Trigger one where ratio is 0 for the max, it should not change
      callback([
          { target: { id: 'ABOUT' }, intersectionRatio: 0 }
      ]);
      expect(app.currentSection).toEqual('PROJECTS');

      // Then trigger one with a new max ratio
      callback([
        { target: { id: 'ABOUT' }, intersectionRatio: 0.9 }
      ]);
      expect(app.currentSection).toEqual('ABOUT');
    }

    jest.restoreAllMocks();
  });

  it('should add mousemove listener and handle event correctly', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const renderer = fixture.debugElement.injector.get(Renderer2);

    let mouseMoveCallback: any;
    jest.spyOn(renderer, 'listen').mockImplementation((target, event, callback) => {
      if (event === 'mousemove') {
        mouseMoveCallback = callback;
      }
      return () => {};
    });

    // Mock document.querySelector to return a mock element
    const mockElement = { style: { display: '', background: '' } } as any;
    jest.spyOn(document, 'querySelector').mockReturnValue(mockElement);

    app.ngAfterViewInit();

    // Now simulate the callback
    if (mouseMoveCallback) {
        const mockEvent = new MouseEvent('mousemove', { clientX: 100, clientY: 200 });
        mouseMoveCallback(mockEvent);
    }

    expect(renderer.listen).toHaveBeenCalledWith(document, 'mousemove', (expect as any).any(Function));
    expect(mockElement.style.display).toBe('block');
    expect(mockElement.style.background).toContain('radial-gradient');
  });
});
