import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ScreenSizeService } from './services/screen-size.service';
import { PortfolioService } from './services/portfolio.service';
import { signal } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async () => {
    // Mock IntersectionObserver
    (window as any).IntersectionObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };

    const screenSizeServiceMock = {
      isSmall: signal(false),
      isMedium: signal(false),
      isLarge: signal(false),
    };

    const portfolioServiceMock = {
      articles: signal([]),
      projects: signal([]),
      workExperiences: signal([]),
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: ScreenSizeService, useValue: screenSizeServiceMock },
        { provide: PortfolioService, useValue: portfolioServiceMock },
      ],
    }).compileComponents();
  });

  afterEach(() => {
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
});
