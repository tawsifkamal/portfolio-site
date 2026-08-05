import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from '../interfaces/article';
import { ScreenSizeService } from '../services/screen-size.service';

@Component({
  selector: 'app-article-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-section.component.html',
  styleUrl: './article-section.component.css'
})
export class ArticleSectionComponent {
  @Input() articles: Article[] = [];
  constructor(public screen: ScreenSizeService) {}
}
