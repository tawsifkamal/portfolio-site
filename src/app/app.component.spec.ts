import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PortfolioService } from './services/portfolio.service';
import { ScreenSizeService } from './services/screen-size.service';
import { NgZone } from '@angular/core';
import { Article } from './interfaces/article';

class MockPortfolioService {
  getArticles(): Article[] {
    return [
      { name: 'Test Article', link: 'http://test.com' }
    ];
  }
}

class MockScreenSizeService {
  isSmall = false;
  isMedium = false;
  isLarge = true;
}

describe('AppComponent', () => {
  let mouseFollower: HTMLElement;

  beforeEach(async () => {
    // Mock IntersectionObserver
    (window as any).IntersectionObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));

    // Create mouse follower element for document.querySelector to find
    mouseFollower = document.createElement('div');
    mouseFollower.classList.add('mouse-follower');
    document.body.appendChild(mouseFollower);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: PortfolioService, useClass: MockPortfolioService },
        { provide: ScreenSizeService, useClass: MockScreenSizeService },
      ]
    }).compileComponents();
  });

  afterEach(() => {
    if (mouseFollower && mouseFollower.parentNode) {
      document.body.removeChild(mouseFollower);
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

  it('should fetch articles on init', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.articles.length).toBe(1);
    expect(app.articles[0].name).toBe('Test Article');
  });

  it('should run high frequency events outside angular zone', () => {
    const ngZone = TestBed.inject(NgZone);
    const runOutsideAngularSpy = jest.spyOn(ngZone, 'runOutsideAngular');

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // triggers ngAfterViewInit

    expect(runOutsideAngularSpy).toHaveBeenCalled();
  });

  it('should remove event listeners on destroy', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    // Spy on removeEventListener
    const removeSpy = jest.spyOn(window, 'removeEventListener');
    const docRemoveSpy = jest.spyOn(document, 'removeEventListener');

    fixture.destroy();

    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    expect(docRemoveSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
  });

  it('should update mouse follower position on mouse move', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance as any;

    // Mock the mouseFollower element to avoid JSDOM CSS parsing issues
    const mockStyle = { background: '' };
    component.mouseFollower = { style: mockStyle };

    // Mock event
    const mockEvent = { clientX: 100, clientY: 200 } as MouseEvent;

    // Call private method
    component.onMouseMove(mockEvent);

    expect(mockStyle.background).toContain('radial-gradient');
    expect(mockStyle.background).toContain('100px 200px');
  });

  it('should update current section on scroll', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance as any;

    // Mock offsets
    component.offsets = {
      ABOUT: 0,
      EXPERIENCE: 500,
      PROJECTS: 1000
    };

    // Simulate scroll position for ABOUT section
    Object.defineProperty(window, 'pageYOffset', { value: 100, writable: true });
    component.onWindowScroll();
    expect(component.currentSection).toBe('ABOUT');

    // Simulate scroll position for EXPERIENCE section
    Object.defineProperty(window, 'pageYOffset', { value: 600, writable: true });
    component.onWindowScroll();
    expect(component.currentSection).toBe('EXPERIENCE');

    // Simulate scroll position for PROJECTS section
    Object.defineProperty(window, 'pageYOffset', { value: 1200, writable: true });
    component.onWindowScroll();
    expect(component.currentSection).toBe('PROJECTS');
  });

  it('should navigate to section', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    const mockElement = {
      scrollIntoView: jest.fn()
    };

    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement as any);

    component.navigateToSection('ABOUT');

    expect(document.getElementById).toHaveBeenCalledWith('ABOUT');
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });
});
