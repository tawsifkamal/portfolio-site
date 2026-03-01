import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkExperienceSectionComponent } from './work-experience-section.component';
import { PortfolioService } from '../services/portfolio.service';
import { ScreenSizeService } from '../services/screen-size.service';
import { WorkExperience } from '../interfaces/work-experience';

describe('WorkExperienceSectionComponent', () => {
  let component: WorkExperienceSectionComponent;
  let fixture: ComponentFixture<WorkExperienceSectionComponent>;

  const mockWorkExperiences: WorkExperience[] = [
    {
      role: 'Test Role',
      dateWorked: 'Test Date',
      company: 'Test Company',
      logoSrc: 'test.svg',
      description: 'Test Description',
      skills: ['Test Skill'],
    }
  ];

  const mockPortfolioService = {
    getWorkExperiences: jest.fn().mockReturnValue(mockWorkExperiences)
  };

  const mockScreenSizeService = {
    isSmall: false,
    isMedium: false,
    isLarge: true
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkExperienceSectionComponent],
      providers: [
        { provide: PortfolioService, useValue: mockPortfolioService },
        { provide: ScreenSizeService, useValue: mockScreenSizeService }
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

  it('should retrieve work experiences from PortfolioService', () => {
    expect(component.workExperiences).toEqual(mockWorkExperiences);
    expect(mockPortfolioService.getWorkExperiences).toHaveBeenCalled();
  });
});
