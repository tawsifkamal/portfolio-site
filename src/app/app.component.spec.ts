import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ScreenSizeService } from './services/screen-size.service';
import { PortfolioService } from './services/portfolio.service';
import { NgZone, PLATFORM_ID } from '@angular/core';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let mockScreenSizeService: any;
  let mockPortfolioService: any;
  let zone: NgZone;

  beforeEach(async () => {
    mockScreenSizeService = {
      isSmall: false,
      isMedium: false,
      isLarge: true,
    };

    mockPortfolioService = {
      articles: [
        { name: 'Article 1', link: 'http://link1.com' },
        { name: 'Article 2', link: 'http://link2.com' },
      ],
      workExperiences: [],
      projects: [],
    };

    // Mock IntersectionObserver
    (window as any).IntersectionObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));

    // Mock window.scrollIntoView since JSDOM doesn't support it
    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: ScreenSizeService, useValue: mockScreenSizeService },
        { provide: PortfolioService, useValue: mockPortfolioService },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    }).compileComponents();

    zone = TestBed.inject(NgZone);
    jest.spyOn(zone, 'runOutsideAngular').mockImplementation((fn: any) => fn());
    jest.spyOn(zone, 'run').mockImplementation((fn: any) => fn());

    // Create mouse-follower element
    const follower = document.createElement('div');
    follower.classList.add('mouse-follower');
    document.body.appendChild(follower);

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.restoreAllMocks();
    const follower = document.querySelector('.mouse-follower');
    if (follower) {
      document.body.removeChild(follower);
    }
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

  it('should call NgZone.runOutsideAngular in ngAfterViewInit', () => {
    fixture.detectChanges(); // This calls ngAfterViewInit
    expect(zone.runOutsideAngular).toHaveBeenCalled();
  });
});
