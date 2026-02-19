import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectSectionComponent } from './project-section.component';
import { PortfolioService } from '../services/portfolio.service';
import { ScreenSizeService } from '../services/screen-size.service';
import { signal } from '@angular/core';

describe('ProjectSectionComponent', () => {
  let component: ProjectSectionComponent;
  let fixture: ComponentFixture<ProjectSectionComponent>;

  beforeEach(async () => {
    const portfolioServiceMock = {
      projects: signal([]),
    };
    const screenSizeServiceMock = {
      isSmall: signal(false),
      isMedium: signal(false),
      isLarge: signal(true),
    };

    await TestBed.configureTestingModule({
      imports: [ProjectSectionComponent],
      providers: [
        { provide: PortfolioService, useValue: portfolioServiceMock },
        { provide: ScreenSizeService, useValue: screenSizeServiceMock },
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
