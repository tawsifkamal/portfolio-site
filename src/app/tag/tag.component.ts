import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-tag',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css',
})
export class TagComponent {
  @Input() text: string;
}
