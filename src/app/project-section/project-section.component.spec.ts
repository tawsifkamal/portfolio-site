import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProjectSectionComponent } from './project-section.component';
import { PortfolioService } from '../services/portfolio.service';
import { Project } from '../interfaces/project';

describe('ProjectSectionComponent', () => {
  let component: ProjectSectionComponent;
  let fixture: ComponentFixture<ProjectSectionComponent>;

  const mockProjects: Project[] = [
    {
      name: 'Test Project',
      description: 'Test Description',
      imageUrl: 'assets/test.png',
      skills: ['Skill A', 'Skill B'],
      link: 'https://test.com',
      linkIconSrc: 'assets/link.png'
    }
  ];

  beforeEach(async () => {
    const portfolioServiceMock = {
      projects: mockProjects
    };

    await TestBed.configureTestingModule({
      imports: [ProjectSectionComponent],
      providers: [
          { provide: PortfolioService, useValue: portfolioServiceMock }
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

  it('should get projects from service', () => {
    expect(component.projects.length).toBe(1);
    expect(component.projects[0].name).toBe('Test Project');
  });

  it('should render project cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('app-project-card'));
    expect(cards.length).toBe(1);
  });
});
