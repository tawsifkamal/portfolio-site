import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagComponent {
  @Input() text: string;
}
