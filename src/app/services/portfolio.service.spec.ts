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

  it('should have projects data', () => {
    const projects = service.getProjects();
    expect(projects.length).toBeGreaterThan(0);
    expect(projects[0].name).toBeDefined();
  });

  it('should have work experiences data', () => {
    const workExperiences = service.getWorkExperiences();
    expect(workExperiences.length).toBeGreaterThan(0);
    expect(workExperiences[0].role).toBeDefined();
  });

  it('should have articles data', () => {
    const articles = service.getArticles();
    expect(articles.length).toBeGreaterThan(0);
    expect(articles[0].name).toBeDefined();
  });
});
