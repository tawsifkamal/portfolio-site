import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * The navigation component.
 */
@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  /**
   * The selected item.
   */
  @Input() selectedItem: string = 'ABOUT';
  /**
   * The event emitter for section changes.
   */
  @Output() sectionChangeEvent = new EventEmitter<string>();

  /**
   * Selects an item.
   * @param item The item to select.
   */
  selectItem(item: string) {
    this.selectedItem = item;
    this.sectionChangeEvent.emit(this.selectedItem);
  }
}
