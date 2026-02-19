import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectCardComponent } from './project-card.component';
import { ScreenSizeService } from '../../services/screen-size.service';
import { signal } from '@angular/core';

describe('ProjectCardComponent', () => {
  let component: ProjectCardComponent;
  let fixture: ComponentFixture<ProjectCardComponent>;

  beforeEach(async () => {
    const screenSizeServiceMock = {
      isSmall: signal(false),
      isMedium: signal(false),
      isLarge: signal(true),
    };

    await TestBed.configureTestingModule({
      imports: [ProjectCardComponent],
      providers: [
        { provide: ScreenSizeService, useValue: screenSizeServiceMock }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectCardComponent);
    component = fixture.componentInstance;
    component.project = {
      name: 'Test Project',
      description: 'Test Description',
      imageUrl: 'test.jpg',
      skills: ['Test Skill'],
      link: 'http://test.com'
    };
    component.hoveredProject = null;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
