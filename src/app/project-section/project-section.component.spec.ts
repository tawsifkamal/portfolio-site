import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSectionComponent } from './project-section.component';
import { PortfolioService } from '../services/portfolio.service';
import { Project } from '../interfaces/project';

class MockPortfolioService {
  getProjects() { return []; }
}

describe('ProjectSectionComponent', () => {
  let component: ProjectSectionComponent;
  let fixture: ComponentFixture<ProjectSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSectionComponent],
      providers: [
        { provide: PortfolioService, useClass: MockPortfolioService }
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
