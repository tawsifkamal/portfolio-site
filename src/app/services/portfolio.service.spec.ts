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

  it('should return projects', () => {
    const projects = service.getProjects();
    expect(projects.length).toBeGreaterThan(0);
    expect(projects[0].name).toBeDefined();
    expect(projects[0].description).toBeDefined();
  });

  it('should return work experiences', () => {
    const experiences = service.getWorkExperiences();
    expect(experiences.length).toBeGreaterThan(0);
    expect(experiences[0].role).toBeDefined();
    expect(experiences[0].company).toBeDefined();
  });
});
