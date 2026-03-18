import { CommonModule } from '@angular/common';
import { WorkExperience } from '../../interfaces/work-experience';
import { Component, Input } from '@angular/core';
import { TagComponent } from '../../tag/tag.component';
import { Subscription } from 'rxjs';
import { ScreenSizeService } from '../../services/screen-size.service';

@Component({
  selector: 'app-work-experience-card',
  standalone: true,
  imports: [TagComponent, CommonModule],
  templateUrl: './work-experience-card.component.html',
  styleUrl: './work-experience-card.component.css',
})
export class WorkExperienceCardComponent {
  isSmallScreen: boolean = false;
  breakpointSubscription: Subscription;

  // we are injecting the BreakpointObserver class so that we don't have to initialize it here
  // injecting means angular does the initliazation of the class for you to prevent tight coupling (also hierarchal injection being used)
  constructor(public screen: ScreenSizeService){}

  @Input() workExperience: WorkExperience;
}
