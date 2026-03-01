import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WorkExperienceSectionComponent } from './work-experience-section.component';
import { PortfolioService } from '../services/portfolio.service';
import { WorkExperience } from '../interfaces/work-experience';
import { ScreenSizeService } from '../services/screen-size.service';
import { of } from 'rxjs';

describe('WorkExperienceSectionComponent', () => {
  let component: WorkExperienceSectionComponent;
  let fixture: ComponentFixture<WorkExperienceSectionComponent>;

  const mockWorkExperiences: WorkExperience[] = [
    {
      role: 'Test Role',
      company: 'Test Company',
      dateWorked: 'Jan 2024 - Present',
      description: 'Test Description',
      logoSrc: 'assets/test.png',
      skills: ['Skill 1', 'Skill 2']
    }
  ];

  beforeEach(async () => {
    const portfolioServiceMock = {
      workExperiences: mockWorkExperiences
    };

    const screenSizeServiceMock = {
      isSmallScreen$: of(false)
    };

    await TestBed.configureTestingModule({
      imports: [WorkExperienceSectionComponent],
      providers: [
          { provide: PortfolioService, useValue: portfolioServiceMock },
          { provide: ScreenSizeService, useValue: screenSizeServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkExperienceSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get work experiences from service', () => {
    expect(component.workExperiences.length).toBe(1);
    expect(component.workExperiences[0].company).toBe('Test Company');
  });

  it('should render work experience cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('app-work-experience-card'));
    expect(cards.length).toBe(1);
  });
});
