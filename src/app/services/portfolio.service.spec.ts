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

  it('should have articles data', () => {
    expect(service.articles).toBeDefined();
    expect(service.articles.length).toBeGreaterThan(0);
    expect(service.articles[0].name).toBe('An Intuitive Approach To Linear Regression');
  });

  it('should have work experiences data', () => {
    expect(service.workExperiences).toBeDefined();
    expect(service.workExperiences.length).toBeGreaterThan(0);
    expect(service.workExperiences[0].company).toBe('IBM Consulting');
  });

  it('should have projects data', () => {
    expect(service.projects).toBeDefined();
    expect(service.projects.length).toBeGreaterThan(0);
    expect(service.projects[0].name).toBe('TinyGen: An LLM Coding Agent');
  });
});
