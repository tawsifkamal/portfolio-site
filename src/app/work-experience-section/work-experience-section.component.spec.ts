import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkExperienceSectionComponent } from './work-experience-section.component';
import { PortfolioService } from '../services/portfolio.service';

describe('WorkExperienceSectionComponent', () => {
  let component: WorkExperienceSectionComponent;
  let fixture: ComponentFixture<WorkExperienceSectionComponent>;

  const portfolioServiceMock = {
    workExperiences: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkExperienceSectionComponent],
      providers: [
        { provide: PortfolioService, useValue: portfolioServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkExperienceSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
