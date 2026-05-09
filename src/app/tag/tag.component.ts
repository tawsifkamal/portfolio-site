import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [],
  templateUrl: './tag.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './tag.component.css',
})
export class TagComponent {
  @Input() text: string;
}
