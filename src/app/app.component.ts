import { NavigationComponent } from './navigation/navigation.component';
import { Component, AfterViewInit, Inject, NgZone, OnDestroy, PLATFORM_ID } from '@angular/core';
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
})
export class AppComponent implements AfterViewInit, OnDestroy {
  offsets = {
    ABOUT: 0,
    EXPERIENCE: 0,
    PROJECTS: 0,
  };

  articles: Article[] = [];
  title = 'portfolio-website';
  currentSection = 'ABOUT';

  private mouseFollower: HTMLElement | null = null;
  private scrollListener: (() => void) | null = null;
  private mouseMoveListener: ((e: MouseEvent) => void) | null = null;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    public screen: ScreenSizeService,
    private portfolioService: PortfolioService,
    private ngZone: NgZone
  ) {
    this.articles = this.portfolioService.getArticles();
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.offsets = {
        ABOUT: this.calculateOffset('ABOUT', 70),
        EXPERIENCE: this.calculateOffset('EXPERIENCE', 70),
        PROJECTS: this.calculateOffset('PROJECTS', 70),
      };

      this.mouseFollower = this.document.querySelector('.mouse-follower') as HTMLElement;
      if (this.mouseFollower) {
        this.mouseFollower.style.display = 'block';
      }

      this.ngZone.runOutsideAngular(() => {
        this.scrollListener = () => this.onWindowScroll();
        window.addEventListener('scroll', this.scrollListener);

        this.mouseMoveListener = (e: MouseEvent) => this.onMouseMove(e);
        document.addEventListener('mousemove', this.mouseMoveListener as EventListener);
      });
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.scrollListener) {
        window.removeEventListener('scroll', this.scrollListener);
      }
      if (this.mouseMoveListener) {
        document.removeEventListener('mousemove', this.mouseMoveListener as EventListener);
      }
    }
  }

  private calculateOffset(sectionId: string, padding: number): number {
    const element = this.document.getElementById(sectionId);
    return element ? element.offsetTop - padding : 0;
  }

  navigateToSection(section: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  private onWindowScroll() {
    const scrollPosition =
      window.pageYOffset ||
      this.document.documentElement.scrollTop ||
      this.document.body.scrollTop ||
      0;

    let newSection = this.currentSection;

    if (
      scrollPosition >= this.offsets['ABOUT'] &&
      scrollPosition < this.offsets['EXPERIENCE']
    ) {
      newSection = 'ABOUT';
    } else if (
      scrollPosition >= this.offsets['EXPERIENCE'] &&
      scrollPosition < this.offsets['PROJECTS']
    ) {
      newSection = 'EXPERIENCE';
    } else if (scrollPosition >= this.offsets['PROJECTS']) {
      newSection = 'PROJECTS';
    }

    if (newSection !== this.currentSection) {
      this.ngZone.run(() => {
        this.currentSection = newSection;
      });
    }
  }

  private onMouseMove(e: MouseEvent) {
    if (this.mouseFollower) {
      this.mouseFollower.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
    }
  }
}
