import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkExperienceSectionComponent } from './work-experience-section.component';
import { PortfolioService } from '../services/portfolio.service';
import { WorkExperience } from '../interfaces/work-experience';

class MockPortfolioService {
  getWorkExperiences() { return []; }
}

describe('WorkExperienceSectionComponent', () => {
  let component: WorkExperienceSectionComponent;
  let fixture: ComponentFixture<WorkExperienceSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkExperienceSectionComponent],
      providers: [
        { provide: PortfolioService, useClass: MockPortfolioService }
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
