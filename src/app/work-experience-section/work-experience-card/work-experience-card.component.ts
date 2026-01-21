import { CommonModule } from '@angular/common';
import { WorkExperience } from '../../interfaces/work-experience';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy } from '@angular/core';
import { TagComponent } from '../../tag/tag.component';
import { Subscription } from 'rxjs';
import { ScreenSizeService } from '../../services/screen-size.service';

@Component({
  selector: 'app-work-experience-card',
  standalone: true,
  imports: [TagComponent, CommonModule],
  templateUrl: './work-experience-card.component.html',
  styleUrl: './work-experience-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkExperienceCardComponent implements OnDestroy {
  breakpointSubscription: Subscription;

  // we are injecting the BreakpointObserver class so that we don't have to initialize it here
  // injecting means angular does the initliazation of the class for you to prevent tight coupling (also hierarchal injection being used)
  constructor(public screen: ScreenSizeService, private cdr: ChangeDetectorRef) {
    this.breakpointSubscription = this.screen.changes$.subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    if (this.breakpointSubscription) {
      this.breakpointSubscription.unsubscribe();
    }
  }

  @Input() workExperience: WorkExperience;
}
