import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkExperienceCardComponent } from './work-experience-card.component';
import { WorkExperience } from '../../interfaces/work-experience';

describe('WorkExperienceCardComponent', () => {
  let component: WorkExperienceCardComponent;
  let fixture: ComponentFixture<WorkExperienceCardComponent>;
  const mockWorkExperience: WorkExperience = {
    company: 'Test Company',
    role: 'Test Role',
    dateWorked: 'Test Date',
    description: 'Test Description',
    skills: [],
    logoSrc: '',
    additionalInfo: ''
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkExperienceCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkExperienceCardComponent);
    component = fixture.componentInstance;
    component.workExperience = mockWorkExperience;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
