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

  it('should have articles', () => {
    expect(service.articles.length).toBeGreaterThan(0);
    expect(service.articles[0].name).toBeDefined();
    expect(service.articles[0].link).toBeDefined();
  });

  it('should have work experiences', () => {
    expect(service.workExperiences.length).toBeGreaterThan(0);
    expect(service.workExperiences[0].role).toBeDefined();
    expect(service.workExperiences[0].company).toBeDefined();
  });

  it('should have projects', () => {
    expect(service.projects.length).toBeGreaterThan(0);
    expect(service.projects[0].name).toBeDefined();
    expect(service.projects[0].description).toBeDefined();
  });
});
