import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectSectionComponent } from './project-section.component';
import { PortfolioService } from '../services/portfolio.service';
import { ScreenSizeService } from '../services/screen-size.service';
import { Project } from '../interfaces/project';

describe('ProjectSectionComponent', () => {
  let component: ProjectSectionComponent;
  let fixture: ComponentFixture<ProjectSectionComponent>;

  const mockProjects: Project[] = [
    {
      name: 'Test Project',
      description: 'Test Description',
      imageUrl: 'test.jpg',
      skills: ['Test'],
      link: 'http://test.com',
      linkIconSrc: 'icon.png'
    }
  ];

  const mockPortfolioService = {
    getProjects: jest.fn().mockReturnValue(mockProjects)
  };

  const mockScreenSizeService = {
    isSmall: false,
    isMedium: false,
    isLarge: true
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSectionComponent],
      providers: [
        { provide: PortfolioService, useValue: mockPortfolioService },
        { provide: ScreenSizeService, useValue: mockScreenSizeService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve projects from PortfolioService', () => {
    expect(component.projects).toEqual(mockProjects);
    expect(mockPortfolioService.getProjects).toHaveBeenCalled();
  });
});
