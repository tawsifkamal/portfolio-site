import { Component, ChangeDetectionStrategy } from '@angular/core';
import { WorkExperienceCardComponent } from './work-experience-card/work-experience-card.component';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../services/portfolio.service';
import { ScreenSizeService } from '../services/screen-size.service';

@Component({
  selector: 'app-work-experience-section',
  standalone: true,
  imports: [WorkExperienceCardComponent, CommonModule],
  templateUrl: 'work-experience-section.component.html',
  styleUrl: './work-experience-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkExperienceSectionComponent {

  constructor(
    public screen: ScreenSizeService,
    public portfolio: PortfolioService
  ) {}
}
