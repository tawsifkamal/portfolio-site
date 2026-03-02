import { Component, Input } from '@angular/core';
/**
 * The tag component.
 */
@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css',
})
export class TagComponent {
  /**
   * The text of the tag.
   */
  @Input() text: string;
}
