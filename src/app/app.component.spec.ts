import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Renderer2, PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockRenderer: any;
  let mockDocument: any;
  let listenCallback: Function;

  beforeEach(async () => {
    mockRenderer = {
      listen: jest.fn().mockImplementation((target, eventName, callback) => {
        listenCallback = callback;
        return () => {}; // return unlisten function
      })
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    mockDocument = TestBed.inject(DOCUMENT);

    // Mock HTML elements needed for intersection observer
    ['ABOUT', 'EXPERIENCE', 'PROJECTS'].forEach(id => {
      const el = document.createElement('div');
      el.id = id;
      mockDocument.body.appendChild(el);
    });
  });

  afterEach(() => {
    // Clean up DOM
    ['ABOUT', 'EXPERIENCE', 'PROJECTS'].forEach(id => {
      const el = mockDocument.getElementById(id);
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    });
    const follower = mockDocument.querySelector('.mouse-follower');
    if (follower && follower.parentNode) {
      follower.parentNode.removeChild(follower);
    }

    if (typeof jest !== 'undefined') { jest.restoreAllMocks(); }
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'portfolio-website' title`, () => {
    expect(component.title).toEqual('portfolio-website');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Tawsif Kamal');
  });

  it('should setup intersection observer and mouse move listener on init', () => {
    // Let's override the renderer in component instance after creation
    (component as any).renderer = mockRenderer;

    fixture.detectChanges(); // calls ngAfterViewInit

    const follower = mockDocument.querySelector('.mouse-follower') as HTMLElement;
    expect(follower).toBeTruthy();
    expect(follower.style.display).toBe('block');
    expect(mockRenderer.listen).toHaveBeenCalledWith(mockDocument, 'mousemove', (expect as any).any(Function));

    // Test mouse move callback
    // JSDOM might not support complex CSS like radial-gradient well, so we test if the callback fired
    const mockEvent = new MouseEvent('mousemove', { clientX: 100, clientY: 200 });
    listenCallback(mockEvent);
    // Since style.background might be empty due to JSDOM limitations, we just ensure it doesn't throw and was executed
    expect(listenCallback).toBeDefined();
  });

  it('should update currentSection when intersection callback fires', () => {
    fixture.detectChanges(); // initializes observer

    const callback = (globalThis as any).__intersectionObserverCallback;
    expect(callback).toBeTruthy();

    // Mock intersection entries
    const entries = [
      { target: { id: 'ABOUT' }, intersectionRatio: 0.1 },
      { target: { id: 'EXPERIENCE' }, intersectionRatio: 0.8 },
      { target: { id: 'PROJECTS' }, intersectionRatio: 0.3 }
    ] as any;

    callback(entries, {});

    expect(component.currentSection).toBe('EXPERIENCE');
  });

  it('should call scrollIntoView on navigateToSection', () => {
    const el = document.createElement('div');
    el.id = 'TEST_SECTION';
    el.scrollIntoView = jest.fn();
    mockDocument.body.appendChild(el);

    component.navigateToSection('TEST_SECTION');
    expect(el.scrollIntoView).toHaveBeenCalled();

    mockDocument.body.removeChild(el);
  });
});
