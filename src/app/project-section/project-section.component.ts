import { Component, OnInit } from '@angular/core';
import { ProjectCardComponent } from './project-card/project-card.component';
import { Project } from '../interfaces/project';
import { CommonModule } from '@angular/common';
import { ScreenSizeService } from '../services/screen-size.service';
import { SupabaseService } from '../services/supabase.service';
import { FALLBACK_PROJECTS } from '../data/fallback-projects';

@Component({
  selector: 'app-project-section',
  standalone: true,
  imports: [ProjectCardComponent, CommonModule],
  templateUrl: './project-section.component.html',
  styleUrl: './project-section.component.css',
})
export class ProjectSectionComponent implements OnInit {
  constructor(
    public screen: ScreenSizeService,
    private supabaseService: SupabaseService
  ) {}

  hoveredProject: string | null = null;
  projects: Project[] = FALLBACK_PROJECTS;

  async ngOnInit() {
    try {
      const dbProjects = await this.supabaseService.getProjects();
      if (dbProjects && dbProjects.length > 0) {
        this.projects = dbProjects;
      }
    } catch (error) {
      console.error('Failed to load projects from Supabase, using fallback data.', error);
    }
  }
}
