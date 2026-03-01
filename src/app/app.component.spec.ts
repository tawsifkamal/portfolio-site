import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PortfolioService } from './services/portfolio.service';
import { ScreenSizeService } from './services/screen-size.service';
import { NgZone, PLATFORM_ID } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { of } from 'rxjs';

// Mock data
const mockArticles = [{ name: 'Test Article', link: 'http://test.com' }];

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockPortfolioService: any;
  let mockScreenSizeService: any;
  let mockBreakpointObserver: any;
  let ngZone: NgZone;

  beforeEach(async () => {
    // Mock PortfolioService
    mockPortfolioService = {
      articles: mockArticles,
    };

    // Mock ScreenSizeService
    mockScreenSizeService = {
        isSmall: false,
        isMedium: false,
        isLarge: true
    };

    // Mock BreakpointObserver
    mockBreakpointObserver = {
        observe: jest.fn().mockReturnValue(of({})),
        isMatched: jest.fn().mockReturnValue(false)
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: PortfolioService, useValue: mockPortfolioService },
        { provide: ScreenSizeService, useValue: mockScreenSizeService },
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: BreakpointObserver, useValue: mockBreakpointObserver }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    ngZone = TestBed.inject(NgZone);
    jest.spyOn(ngZone, 'runOutsideAngular').mockImplementation((fn: any) => fn());
    jest.spyOn(ngZone, 'run').mockImplementation((fn: any) => fn());

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    // Mock document methods to prevent errors during ngAfterViewInit
    jest.spyOn(document, 'querySelector').mockReturnValue(document.createElement('div'));
    jest.spyOn(document, 'getElementById').mockReturnValue(document.createElement('div'));

    fixture.detectChanges();
  });

  afterEach(() => {
      jest.restoreAllMocks();
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

  it('should run event listeners outside angular', () => {
      expect(ngZone.runOutsideAngular).toHaveBeenCalled();
  });

  it('should load articles from service', () => {
      expect(component.articles).toEqual(mockArticles);
  });
});
