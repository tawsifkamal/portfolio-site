import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ScreenSizeService } from './services/screen-size.service';
import { PortfolioService } from './services/portfolio.service';
import { of } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

class MockScreenSizeService {
  isSmall = false;
  isMedium = false;
  isLarge = true;
}

class MockPortfolioService {
  articles = [];
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: ScreenSizeService, useClass: MockScreenSizeService },
        { provide: PortfolioService, useClass: MockPortfolioService },
      ],
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
