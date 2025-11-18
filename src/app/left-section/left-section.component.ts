import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScreenSizeService } from '../services/screen-size.service';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-left-section',
  standalone: true,
  imports: [CommonModule, NavigationComponent],
  templateUrl: './left-section.component.html',
  styleUrls: ['./left-section.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftSectionComponent {
  @Input() currentSection: string = 'ABOUT';
  @Output() sectionChangeEvent = new EventEmitter<string>();

  constructor(public screen: ScreenSizeService) {}

  navigateToSection(section: string) {
    this.sectionChangeEvent.emit(section);
  }
}
