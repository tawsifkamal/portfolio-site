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
});
