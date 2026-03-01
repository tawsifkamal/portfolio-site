import { NavigationComponent } from './navigation/navigation.component';
import { Component, AfterViewInit, Inject, PLATFORM_ID, NgZone, OnDestroy } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { WorkExperienceSectionComponent } from './work-experience-section/work-experience-section.component';
import { TagComponent } from './tag/tag.component';
import { ProjectSectionComponent } from './project-section/project-section.component';
import { ScreenSizeService } from './services/screen-size.service';
import { PortfolioService } from './services/portfolio.service';

const SECTIONS = {
  ABOUT: 'ABOUT',
  EXPERIENCE: 'EXPERIENCE',
  PROJECTS: 'PROJECTS',
};

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
    [SECTIONS.ABOUT]: 0,
    [SECTIONS.EXPERIENCE]: 0,
    [SECTIONS.PROJECTS]: 0,
  };

  currentSection = SECTIONS.ABOUT;
  title = 'portfolio-website';

  private removeScrollListener: (() => void) | undefined;
  private removeMouseMoveListener: (() => void) | undefined;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone,
    public screen: ScreenSizeService,
    public portfolioService: PortfolioService
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.offsets = {
        [SECTIONS.ABOUT]: this.calculateOffset(SECTIONS.ABOUT, 70),
        [SECTIONS.EXPERIENCE]: this.calculateOffset(SECTIONS.EXPERIENCE, 70),
        [SECTIONS.PROJECTS]: this.calculateOffset(SECTIONS.PROJECTS, 70),
      };

      const follower = this.document.querySelector(
        '.mouse-follower'
      ) as HTMLElement;
      if (follower) {
        follower.style.display = 'block';
      }

      this.ngZone.runOutsideAngular(() => {
        const scrollHandler = () => this.onWindowScroll();
        window.addEventListener('scroll', scrollHandler);
        this.removeScrollListener = () =>
          window.removeEventListener('scroll', scrollHandler);

        const mouseMoveHandler = (e: MouseEvent) => this.onMouseMove(e);
        document.addEventListener('mousemove', mouseMoveHandler);
        this.removeMouseMoveListener = () =>
          document.removeEventListener('mousemove', mouseMoveHandler);
      });
    }
  }

  ngOnDestroy() {
    if (this.removeScrollListener) this.removeScrollListener();
    if (this.removeMouseMoveListener) this.removeMouseMoveListener();
  }

  private calculateOffset(sectionId: string, padding: number): number {
    if (!isPlatformBrowser(this.platformId)) return 0;
    const element = this.document.getElementById(sectionId);
    return element ? element.offsetTop - padding : 0;
  }

  navigateToSection(section: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.document.getElementById(section)?.scrollIntoView();
    }
  }

  onWindowScroll() {
    const scrollPosition =
      window.pageYOffset ||
      this.document.documentElement.scrollTop ||
      this.document.body.scrollTop ||
      0;

    let newSection = this.currentSection;

    if (
      scrollPosition > this.offsets[SECTIONS.ABOUT] &&
      scrollPosition < this.offsets[SECTIONS.EXPERIENCE]
    ) {
      newSection = SECTIONS.ABOUT;
    } else if (
      scrollPosition > this.offsets[SECTIONS.EXPERIENCE] &&
      scrollPosition < this.offsets[SECTIONS.PROJECTS]
    ) {
      newSection = SECTIONS.EXPERIENCE;
    } else if (scrollPosition > this.offsets[SECTIONS.PROJECTS]) {
      newSection = SECTIONS.PROJECTS;
    }

    if (newSection !== this.currentSection) {
      this.ngZone.run(() => {
        this.currentSection = newSection;
      });
    }
  }

  onMouseMove(e: MouseEvent) {
    const follower = document.querySelector('.mouse-follower') as HTMLElement;
    if (follower) {
      follower.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
    }
  }

  get articles() {
    return this.portfolioService.articles;
  }
}
