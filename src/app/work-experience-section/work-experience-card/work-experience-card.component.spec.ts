import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkExperienceCardComponent } from './work-experience-card.component';
import { ScreenSizeService } from '../../services/screen-size.service';
import { signal } from '@angular/core';

describe('WorkExperienceCardComponent', () => {
  let component: WorkExperienceCardComponent;
  let fixture: ComponentFixture<WorkExperienceCardComponent>;

  beforeEach(async () => {
    const screenSizeServiceMock = {
      isSmall: signal(false),
      isMedium: signal(false),
      isLarge: signal(true),
    };

    await TestBed.configureTestingModule({
      imports: [WorkExperienceCardComponent],
      providers: [
        { provide: ScreenSizeService, useValue: screenSizeServiceMock }
      ]
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
      additionalInfo: 'Test Info'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
