import { TestBed } from '@angular/core/testing';
import { PortfolioService } from './portfolio.service';

describe('PortfolioService', () => {
  let service: PortfolioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortfolioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return articles', () => {
    const articles = service.getArticles();
    expect(articles.length).toBeGreaterThan(0);
    expect(articles[0].name).toBeDefined();
    expect(articles[0].link).toBeDefined();
  });
});
