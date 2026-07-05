import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  @Input() selectedItem: string = 'ABOUT';
  @Output() sectionChangeEvent = new EventEmitter<string>();

  selectItem(item: string) {
    this.selectedItem = item;
    this.sectionChangeEvent.emit(this.selectedItem);
  }
}
