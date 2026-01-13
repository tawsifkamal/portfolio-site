import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkExperienceCardComponent } from './work-experience-card.component';

describe('ProjectCardComponent', () => {
  let component: WorkExperienceCardComponent;
  let fixture: ComponentFixture<WorkExperienceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkExperienceCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkExperienceCardComponent);
    component = fixture.componentInstance;
    component.workExperience = {
      company: 'Test Company',
      role: 'Test Role',
      dateWorked: 'Test Date',
      additionalInfo: '',
      skills: [],
      description: '',
      logoSrc: ''
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
