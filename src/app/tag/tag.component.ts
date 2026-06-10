import { ChangeDetectionStrategy } from '@angular/core';
import { Component, Input } from '@angular/core';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-tag',
  standalone: true,
  imports: [],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css',
})
export class TagComponent {
  @Input() text: string;
}
