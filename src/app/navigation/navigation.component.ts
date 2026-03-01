import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  @Input() selectedItem: string = 'ABOUT';
  @Output() sectionChangeEvent = new EventEmitter<string>();

  sections = ['ABOUT', 'EXPERIENCE', 'PROJECTS'];

  selectItem(item: string) {
    this.selectedItem = item;
    this.sectionChangeEvent.emit(this.selectedItem);
  }
}
