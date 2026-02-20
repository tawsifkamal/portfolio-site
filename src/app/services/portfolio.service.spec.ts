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

  it('should have initial projects', () => {
    expect(service.projects().length).toBeGreaterThan(0);
  });

  it('should have initial work experiences', () => {
    expect(service.workExperiences().length).toBeGreaterThan(0);
  });

  it('should have initial articles', () => {
    expect(service.articles().length).toBeGreaterThan(0);
  });
});
