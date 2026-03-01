import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectSectionComponent } from './project-section.component';
import { SupabaseService } from '../services/supabase.service';

describe('ProjectSectionComponent', () => {
  let component: ProjectSectionComponent;
  let fixture: ComponentFixture<ProjectSectionComponent>;
  let mockSupabaseService: any;

  beforeEach(async () => {
    mockSupabaseService = {
      getProjects: jasmine.createSpy('getProjects').and.returnValue(Promise.resolve([]))
    };

    await TestBed.configureTestingModule({
      imports: [ProjectSectionComponent],
      providers: [
        { provide: SupabaseService, useValue: mockSupabaseService }
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

  it('should call getProjects on init', () => {
    expect(mockSupabaseService.getProjects).toHaveBeenCalled();
  });
});
