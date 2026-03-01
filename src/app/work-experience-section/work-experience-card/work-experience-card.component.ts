import { CommonModule } from '@angular/common';
import { WorkExperience } from '../../interfaces/work-experience';
import { Component, Input, inject } from '@angular/core';
import { TagComponent } from '../../tag/tag.component';
import { ScreenSizeService } from '../../services/screen-size.service';

@Component({
  selector: 'app-work-experience-card',
  standalone: true,
  imports: [TagComponent, CommonModule],
  templateUrl: './work-experience-card.component.html',
  styleUrl: './work-experience-card.component.css',
})
export class WorkExperienceCardComponent {
  screen = inject(ScreenSizeService);

  @Input({ required: true }) workExperience!: WorkExperience;
}
