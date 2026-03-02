import { Component } from '@angular/core';
import { WorkExperienceCardComponent } from './work-experience-card/work-experience-card.component';
import { WorkExperience } from '../interfaces/work-experience';
import { ScreenSizeService } from '../services/screen-size.service';
import { WorkExperienceService } from '../services/work-experience.service';

@Component({
  selector: 'app-work-experience-section',
  standalone: true,
  imports: [WorkExperienceCardComponent],
  templateUrl: 'work-experience-section.component.html',
  styleUrl: './work-experience-section.component.css',
})
export class WorkExperienceSectionComponent {

  constructor(public screen: ScreenSizeService, private workExperienceService: WorkExperienceService) {}

  workExperiences: WorkExperience[] = [];

  ngOnInit(): void {
    this.workExperienceService.getWorkExperiences().subscribe(workExperiences => {
      this.workExperiences = workExperiences;
    });
  }
}
