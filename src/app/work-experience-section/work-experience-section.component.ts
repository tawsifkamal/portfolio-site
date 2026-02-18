import { Component } from '@angular/core';
import { WorkExperienceCardComponent } from './work-experience-card/work-experience-card.component';
import { WorkExperience } from '../interfaces/work-experience';
import { ScreenSizeService } from '../services/screen-size.service';
import { PortfolioService } from '../services/portfolio.service';

@Component({
  selector: 'app-work-experience-section',
  standalone: true,
  imports: [WorkExperienceCardComponent],
  templateUrl: 'work-experience-section.component.html',
  styleUrl: './work-experience-section.component.css',
})
export class WorkExperienceSectionComponent {
  constructor(
    public screen: ScreenSizeService,
    private portfolio: PortfolioService
  ) {}

  get workExperiences(): WorkExperience[] {
    return this.portfolio.workExperiences();
  }
}
