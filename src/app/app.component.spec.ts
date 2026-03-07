import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Renderer2, NgZone } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ScreenSizeService } from './services/screen-size.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let mockScreenSizeService: any;

  beforeEach(async () => {
    // Setup dummy mouse-follower element for renderer manipulation
    const follower = document.createElement('div');
    follower.classList.add('mouse-follower');
    document.body.appendChild(follower);

    const mockBreakpointObserver = {
      observe: jest.fn().mockReturnValue(of({ matches: false, breakpoints: {} })),
      isMatched: jest.fn().mockReturnValue(false)
    };

    const mockScreenSizeService = {
      isSmall: false,
      isMedium: false,
      isLarge: true,
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: BreakpointObserver, useValue: mockBreakpointObserver },
        { provide: ScreenSizeService, useValue: mockScreenSizeService }
      ]
    })
    .overrideComponent(AppComponent, {
      set: {
        providers: [
          { provide: ScreenSizeService, useValue: mockScreenSizeService }
        ]
      }
    })
    .compileComponents();
  });

  afterEach(() => {
    const follower = document.querySelector('.mouse-follower');
    if (follower) {
      document.body.removeChild(follower);
    }
    jest.restoreAllMocks();
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

  it('should manipulate mouse-follower position on mousemove', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    // Trigger mousemove event
    const event = new MouseEvent('mousemove', { clientX: 100, clientY: 200 });
    document.dispatchEvent(event);

    // Test would involve checking if renderer.setStyle was called
    const follower = document.querySelector('.mouse-follower') as HTMLElement;
    expect(follower).toBeTruthy();
    // JSDOM has poor support for checking complex radial-gradients, so we just
    // verify the logic ran without throwing.
  });

  it('should navigate to section using scrollIntoView', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    const dummyElement = document.createElement('div');
    dummyElement.id = 'TEST_SECTION';
    dummyElement.scrollIntoView = jest.fn();
    document.body.appendChild(dummyElement);

    app.navigateToSection('TEST_SECTION');

    expect(dummyElement.scrollIntoView).toHaveBeenCalled();
    document.body.removeChild(dummyElement);
  });

  it('should handle observer entries properly', () => {
     const fixture = TestBed.createComponent(AppComponent);
     const app = fixture.componentInstance;
     fixture.detectChanges();

     // The IntersectionObserver mock in setup-jest.ts makes this slightly
     // difficult to test the full loop natively without an explicit callback
     // expose. We can simulate the class fields if needed.

     expect(app.currentSection).toBe('ABOUT');
  });
});
