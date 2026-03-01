import { NavigationComponent } from './navigation/navigation.component';
import {
  Component,
  AfterViewInit,
  Inject,
  NgZone,
  PLATFORM_ID,
  OnDestroy,
} from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { WorkExperienceSectionComponent } from './work-experience-section/work-experience-section.component';
import { TagComponent } from './tag/tag.component';
import { ProjectSectionComponent } from './project-section/project-section.component';
import { Article } from './interfaces/article';
import { ScreenSizeService } from './services/screen-size.service';
import { PortfolioService } from './services/portfolio.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    WorkExperienceSectionComponent,
    TagComponent,
    NavigationComponent,
    ProjectSectionComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ScreenSizeService],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private observer: IntersectionObserver | null = null;
  private mouseMoveListener: ((e: MouseEvent) => void) | null = null;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone,
    public screen: ScreenSizeService,
    public portfolioService: PortfolioService
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
      this.setupMouseFollower();
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.mouseMoveListener) {
      this.document.removeEventListener('mousemove', this.mouseMoveListener);
    }
  }

  private setupMouseFollower() {
    const follower = this.document.querySelector(
      '.mouse-follower'
    ) as HTMLElement;
    if (follower) {
      follower.style.display = 'block';

      this.mouseMoveListener = (e: MouseEvent) => {
        follower.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
      };

      this.ngZone.runOutsideAngular(() => {
        if (this.mouseMoveListener) {
          this.document.addEventListener('mousemove', this.mouseMoveListener);
        }
      });
    }
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.ngZone.run(() => {
            this.currentSection = entry.target.id;
          });
        }
      });
    }, options);

    ['ABOUT', 'EXPERIENCE', 'PROJECTS'].forEach((id) => {
      const element = this.document.getElementById(id);
      if (element) this.observer?.observe(element);
    });
  }

  currentSection = 'ABOUT';

  navigateToSection(section: string) {
    this.document
      .getElementById(section)
      ?.scrollIntoView({ behavior: 'smooth' });
  }

  articles: Article[] = this.portfolioService.articles;

  title = 'portfolio-website';
}
