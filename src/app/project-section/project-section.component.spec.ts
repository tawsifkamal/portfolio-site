import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSectionComponent } from './project-section.component';
import { PortfolioService } from '../services/portfolio.service';

describe('ProjectSectionComponent', () => {
  let component: ProjectSectionComponent;
  let fixture: ComponentFixture<ProjectSectionComponent>;

  const portfolioServiceMock = {
    projects: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSectionComponent],
      providers: [
        { provide: PortfolioService, useValue: portfolioServiceMock }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
