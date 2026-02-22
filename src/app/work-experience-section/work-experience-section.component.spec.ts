import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkExperienceSectionComponent } from './work-experience-section.component';
import { PortfolioService } from '../services/portfolio.service';
import { ScreenSizeService } from '../services/screen-size.service';
import { signal } from '@angular/core';

describe('WorkExperienceSectionComponent', () => {
  let component: WorkExperienceSectionComponent;
  let fixture: ComponentFixture<WorkExperienceSectionComponent>;

  beforeEach(async () => {
    const portfolioServiceMock = {
      workExperiences: signal([])
    };

    const screenSizeServiceMock = {
      isSmall: signal(false)
    };

    await TestBed.configureTestingModule({
      imports: [WorkExperienceSectionComponent],
      providers: [
        { provide: PortfolioService, useValue: portfolioServiceMock },
        { provide: ScreenSizeService, useValue: screenSizeServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkExperienceSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
