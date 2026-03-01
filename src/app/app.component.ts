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
  providers: [ScreenSizeService],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  offsets = {
    ABOUT: 0,
    EXPERIENCE: 0,
    PROJECTS: 0,
  };

  articles: Article[];
  title = 'portfolio-website';
  currentSection = 'ABOUT';

  private boundOnWindowScroll = this.onWindowScroll.bind(this);
  private boundOnMouseMove = this.onMouseMove.bind(this);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    public screen: ScreenSizeService,
    private portfolioService: PortfolioService,
    private ngZone: NgZone
  ) {
    this.articles = this.portfolioService.articles;
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.offsets = {
        ABOUT: this.calculateOffset('ABOUT', 70),
        EXPERIENCE: this.calculateOffset('EXPERIENCE', 70),
        PROJECTS: this.calculateOffset('PROJECTS', 70),
      };


      const follower = this.document.querySelector(
        '.mouse-follower'
      ) as HTMLElement;
      if (follower) {
        follower.style.display = 'block';
      }

      this.ngZone.runOutsideAngular(() => {
        window.addEventListener('scroll', this.boundOnWindowScroll);
        this.document.addEventListener('mousemove', this.boundOnMouseMove);
      });
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.boundOnWindowScroll);
      this.document.removeEventListener('mousemove', this.boundOnMouseMove);
    }
  }

  private calculateOffset(sectionId: string, padding: number): number {
    const element = this.document.getElementById(sectionId);
    return element ? element.offsetTop - padding : 0;
  }

  navigateToSection(section: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.document.getElementById(section)?.scrollIntoView();
    }
  }

  onWindowScroll() {
    if (!isPlatformBrowser(this.platformId)) return;
    // Get current scroll position
    const scrollPosition =
      window.pageYOffset ||
      this.document.documentElement.scrollTop ||
      this.document.body.scrollTop ||
      0;

    let newSection = this.currentSection;

    if (
      scrollPosition > this.offsets['ABOUT'] &&
      scrollPosition < this.offsets['EXPERIENCE']
    ) {
      newSection = 'ABOUT';
    } else if (
      scrollPosition > this.offsets['EXPERIENCE'] &&
      scrollPosition < this.offsets['PROJECTS']
    ) {
      newSection = 'EXPERIENCE';
    } else if (scrollPosition > this.offsets['PROJECTS']) {
      newSection = 'PROJECTS';
    }

    if (newSection !== this.currentSection) {
      this.ngZone.run(() => {
        this.currentSection = newSection;
      });
    }
  }

  onMouseMove(e: MouseEvent) {
    if (!isPlatformBrowser(this.platformId)) return;
    const follower = document.querySelector('.mouse-follower') as HTMLElement;
    if (follower) {
      // Update background style for radial gradient to follow the cursor
      follower.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
    }
  }
}
