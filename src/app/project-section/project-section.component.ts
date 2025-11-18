import { Component } from '@angular/core';
import { ProjectCardComponent } from './project-card/project-card.component';
import { Project } from '../interfaces/project';
import { CommonModule } from '@angular/common';
import { ScreenSizeService } from '../services/screen-size.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-project-section',
  standalone: true,
  imports: [ProjectCardComponent, CommonModule],
  templateUrl: './project-section.component.html',
  styleUrl: './project-section.component.css',
})
export class ProjectSectionComponent {
  projects: Project[];

  constructor(public screen: ScreenSizeService, private dataService: DataService) {
    this.projects = this.dataService.projects;
  }

  hoveredProject: string | null = null;
}
