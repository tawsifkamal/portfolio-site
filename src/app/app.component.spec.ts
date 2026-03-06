import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PLATFORM_ID, NgZone } from '@angular/core';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    // Add dummy mouse-follower element for tests
    const dummyFollower = document.createElement('div');
    dummyFollower.classList.add('mouse-follower');
    document.body.appendChild(dummyFollower);

    // Mock IntersectionObserver entries callback
    globalThis.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
      _trigger: (entries: any[]) => callback(entries)
    }));

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' },
        // Do not mock NgZone to return functions directly, it breaks angular tests that expect NgZone to exist and have subscribe
      ]
    }).compileComponents();
  });

  afterEach(() => {
    const follower = document.querySelector('.mouse-follower');
    if (follower) {
      document.body.removeChild(follower);
    }
    jest.restoreAllMocks();
  });

  it('should create the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'portfolio-website' title`, () => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    expect(app.title).toEqual('portfolio-website');
  });

  it('should render title', () => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Tawsif Kamal');
  });

  it('should navigate to section using scrollIntoView', () => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();

    const dummySection = document.createElement('div');
    dummySection.id = 'TEST_SECTION';
    dummySection.scrollIntoView = jest.fn();
    document.body.appendChild(dummySection);

    app.navigateToSection('TEST_SECTION');

    expect(dummySection.scrollIntoView).toHaveBeenCalled();
    document.body.removeChild(dummySection);
  });

  it('should update currentSection when intersecting', () => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();

    // Trigger IntersectionObserver callback
    const observerMock = (app as any).observer;
    observerMock._trigger([{ target: { id: 'EXPERIENCE' }, isIntersecting: true }]);

    expect(app.currentSection).toEqual('EXPERIENCE');
  });

});
