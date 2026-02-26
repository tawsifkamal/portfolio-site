import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PortfolioService } from './services/portfolio.service';
import { ScreenSizeService } from './services/screen-size.service';
import { of } from 'rxjs';
import { PLATFORM_ID } from '@angular/core';

describe('AppComponent', () => {
  let mockPortfolioService: any;
  let mockScreenSizeService: any;

  beforeEach(async () => {
    mockPortfolioService = {
      articles: [],
      projects: [],
      workExperiences: []
    };

    mockScreenSizeService = {
      isSmall: false,
      isMedium: false,
      isLarge: true
    };

    // Mock IntersectionObserver
    (window as any).IntersectionObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: PortfolioService, useValue: mockPortfolioService },
        { provide: ScreenSizeService, useValue: mockScreenSizeService },
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    }).compileComponents();
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
