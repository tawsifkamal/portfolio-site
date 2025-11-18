import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from '../interfaces/article';
import { ScreenSizeService } from '../services/screen-size.service';
import { WorkExperienceSectionComponent } from '../work-experience-section/work-experience-section.component';
import { ProjectSectionComponent } from '../project-section/project-section.component';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-right-section',
  standalone: true,
  imports: [CommonModule, WorkExperienceSectionComponent, ProjectSectionComponent],
  templateUrl: './right-section.component.html',
  styleUrls: ['./right-section.component.css'],
})
export class RightSectionComponent {
  articles: Article[];

  constructor(
    public screen: ScreenSizeService,
    private articleService: ArticleService
  ) {
    this.articles = this.articleService.getArticles();
  }
}
