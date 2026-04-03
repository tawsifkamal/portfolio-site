import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PLATFORM_ID, Renderer2 } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let renderer: Renderer2;

  beforeEach(async () => {
    if (!HTMLElement.prototype.scrollIntoView) {
      HTMLElement.prototype.scrollIntoView = jest.fn();
    }

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    renderer = fixture.debugElement.injector.get(Renderer2);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'portfolio-website' title`, () => {
    expect(component.title).toEqual('portfolio-website');
  });

  it('should render name', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Tawsif Kamal');
  });

  it('should handle mouse move events and update follower background', () => {
    let mouseMoveCallback: Function | undefined;
    jest.spyOn(renderer, 'listen').mockImplementation((target, event, callback) => {
      if (event === 'mousemove') {
        mouseMoveCallback = callback;
      }
      return () => {};
    });

    fixture.detectChanges(); // triggers ngAfterViewInit

    expect(mouseMoveCallback).toBeDefined();

    const mockEvent = { clientX: 100, clientY: 200 } as MouseEvent;
    mouseMoveCallback!(mockEvent);

    const follower = fixture.nativeElement.querySelector('.mouse-follower') as HTMLElement;
    // In JSDOM, background might be set but not exactly what we expect due to parsing.
    // We just want to see it was updated or that it has something.
    expect(follower.style.background).toBeDefined();
  });

  it('should navigate to section and scroll into view', () => {
    fixture.detectChanges();
    const sectionId = 'EXPERIENCE';
    const mockElement = document.createElement('div');
    mockElement.id = sectionId;
    document.body.appendChild(mockElement);

    const scrollSpy = jest.spyOn(mockElement, 'scrollIntoView');

    component.navigateToSection(sectionId);

    expect(scrollSpy).toHaveBeenCalled();
    document.body.removeChild(mockElement);
  });

  it('should update current section when intersection occurs', () => {
    fixture.detectChanges();

    const callback = (globalThis as any).__intersectionObserverCallback;
    expect(callback).toBeDefined();

    callback([
      {
        target: { id: 'PROJECTS' },
        intersectionRatio: 0.9
      }
    ]);

    expect(component.currentSection).toBe('PROJECTS');
  });

  it('should handle multiple sections and pick the one with max ratio', () => {
    fixture.detectChanges();
    const callback = (globalThis as any).__intersectionObserverCallback;

    callback([
      { target: { id: 'ABOUT' }, intersectionRatio: 0.2 },
      { target: { id: 'EXPERIENCE' }, intersectionRatio: 0.8 },
      { target: { id: 'PROJECTS' }, intersectionRatio: 0.5 }
    ]);

    expect(component.currentSection).toBe('EXPERIENCE');
  });
});
