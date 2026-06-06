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
      role: 'Test Role',
      company: 'Test Company',
      dateWorked: '2023',
      description: 'Test Description',
      skills: ['Test Skill'],
      logoSrc: 'test.png',
      additionalInfo: 'Test Info',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
