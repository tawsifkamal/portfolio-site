import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ProjectCardComponent } from './project-card/project-card.component';
import { CommonModule } from '@angular/common';
import { ScreenSizeService } from '../services/screen-size.service';
import { PortfolioService } from '../services/portfolio.service';

@Component({
  selector: 'app-project-section',
  standalone: true,
  imports: [ProjectCardComponent, CommonModule],
  templateUrl: './project-section.component.html',
  styleUrl: './project-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectSectionComponent {
  constructor(
    public screen: ScreenSizeService,
    public portfolioService: PortfolioService
  ) {}

  hoveredProject: string | null = null;
}
