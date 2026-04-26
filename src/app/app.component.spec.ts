import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let originalScrollIntoView: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    originalScrollIntoView = HTMLElement.prototype.scrollIntoView;
    HTMLElement.prototype.scrollIntoView = jest.fn();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
    if (typeof jest !== 'undefined') { jest.restoreAllMocks(); }
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'portfolio-website' title`, () => {
    expect(component.title).toEqual('portfolio-website');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Tawsif Kamal');
  });

  it('should unregister intersection observer and mouse move listener on destroy', () => {
     const disconnectSpy = jest.spyOn(component['intersectionObserver'] as any, 'disconnect');
     const mockRemoveListener = jest.fn();
     component['mouseMoveListener'] = mockRemoveListener;

     component.ngOnDestroy();

     expect(disconnectSpy).toHaveBeenCalled();
     expect(mockRemoveListener).toHaveBeenCalled();
  });

  it('should update current section when observer fires', () => {
      const callback = (globalThis as any).__intersectionObserverCallback;
      expect(callback).toBeDefined();

      callback([
        { target: { id: 'EXPERIENCE' }, intersectionRatio: 0.8 },
        { target: { id: 'ABOUT' }, intersectionRatio: 0.2 },
        { target: { id: 'PROJECTS' }, intersectionRatio: 0.1 }
      ]);

      expect(component.currentSection).toBe('EXPERIENCE');
  });

  it('should update current section when observer fires multiple times', () => {
      const callback = (globalThis as any).__intersectionObserverCallback;

      callback([
        { target: { id: 'PROJECTS' }, intersectionRatio: 0.9 }
      ]);
      expect(component.currentSection).toBe('PROJECTS');

      callback([
        { target: { id: 'ABOUT' }, intersectionRatio: 0.6 }
      ]);
      expect(component.currentSection).toBe('PROJECTS');
  });

  it('should track mouse movements with Renderer2', () => {
      const document = TestBed.inject(DOCUMENT);
      const renderer = fixture.debugElement.injector.get(Renderer2);
      const setStyleSpy = jest.spyOn(renderer, 'setStyle');

      // The listener is attached directly to the document
      const event = new MouseEvent('mousemove', { clientX: 100, clientY: 200 });
      document.dispatchEvent(event);

      expect(setStyleSpy).toHaveBeenCalled();
      expect(setStyleSpy.mock.calls[0][1]).toBe('background');
      expect(setStyleSpy.mock.calls[0][2]).toContain('radial-gradient(600px at 100px 200px');
  });

  it('should handle navigation to a section', () => {
      const mockElement = document.createElement('div');
      mockElement.id = 'TEST_SECTION';
      document.body.appendChild(mockElement);

      component.navigateToSection('TEST_SECTION');

      expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
      document.body.removeChild(mockElement);
  });

  it('should not throw if setupMouseMoveListener follower is null', () => {
     component['setupMouseMoveListener'](null);
     expect(component).toBeTruthy();
  });
});
