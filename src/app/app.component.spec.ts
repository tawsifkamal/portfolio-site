import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PortfolioService } from './services/portfolio.service';
import { ScreenSizeService } from './services/screen-size.service';
import { Article } from './interfaces/article';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const mockArticles: Article[] = [
    { name: 'Test Article', link: 'http://test.com' }
  ];

  const mockPortfolioService = {
    getArticles: jest.fn().mockReturnValue(mockArticles),
    getProjects: jest.fn().mockReturnValue([]),
    getWorkExperiences: jest.fn().mockReturnValue([])
  };

  const mockScreenSizeService = {
    isSmall: false,
    isMedium: false,
    isLarge: true
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: PortfolioService, useValue: mockPortfolioService },
        { provide: ScreenSizeService, useValue: mockScreenSizeService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    // Mock scrollIntoView for JSDOM
    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'portfolio-website' title`, () => {
    expect(component.title).toEqual('portfolio-website');
  });

  it('should retrieve articles from PortfolioService', () => {
    expect(component.articles).toEqual(mockArticles);
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Tawsif Kamal');
  });
});
