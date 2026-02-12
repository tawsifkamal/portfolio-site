import { NavigationComponent } from './navigation/navigation.component';
import { Component, AfterViewInit, Inject, PLATFORM_ID, NgZone, OnDestroy, Renderer2 } from '@angular/core';
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
  readonly SECTION_ABOUT = 'ABOUT';
  readonly SECTION_EXPERIENCE = 'EXPERIENCE';
  readonly SECTION_PROJECTS = 'PROJECTS';

  offsets: { [key: string]: number } = {
    [this.SECTION_ABOUT]: 0,
    [this.SECTION_EXPERIENCE]: 0,
    [this.SECTION_PROJECTS]: 0,
  };

  private unlistenScroll: () => void;
  private unlistenMouseMove: () => void;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    public screen: ScreenSizeService,
    private portfolioService: PortfolioService,
    private ngZone: NgZone,
    private renderer: Renderer2
  ) {
    this.articles = this.portfolioService.getArticles();
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.offsets = {
        [this.SECTION_ABOUT]: this.calculateOffset(this.SECTION_ABOUT, 70),
        [this.SECTION_EXPERIENCE]: this.calculateOffset(this.SECTION_EXPERIENCE, 70),
        [this.SECTION_PROJECTS]: this.calculateOffset(this.SECTION_PROJECTS, 70),
      };

      const follower = this.document.querySelector(
        '.mouse-follower'
      ) as HTMLElement;

      if (follower) {
        follower.style.display = 'block';

        this.ngZone.runOutsideAngular(() => {
          this.unlistenMouseMove = this.renderer.listen(this.document, 'mousemove', (e: MouseEvent) => {
             follower.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
          });
        });
      }

      this.ngZone.runOutsideAngular(() => {
        this.unlistenScroll = this.renderer.listen(window, 'scroll', () => {
          this.onWindowScroll();
        });
      });
    }
  }

  ngOnDestroy() {
    if (this.unlistenScroll) {
      this.unlistenScroll();
    }
    if (this.unlistenMouseMove) {
      this.unlistenMouseMove();
    }
  }

  private calculateOffset(sectionId: string, padding: number): number {
    const element = this.document.getElementById(sectionId);
    return element ? element.offsetTop - padding : 0;
  }

  currentSection = this.SECTION_ABOUT;

  navigateToSection(section: string) {
    this.document.getElementById(section)?.scrollIntoView();
  }

  onWindowScroll() {
    // Get current scroll position
    const scrollPosition =
      window.pageYOffset ||
      this.document.documentElement.scrollTop ||
      this.document.body.scrollTop ||
      0;

    let newSection = this.currentSection;

    if (
      scrollPosition > this.offsets[this.SECTION_ABOUT] &&
      scrollPosition < this.offsets[this.SECTION_EXPERIENCE]
    ) {
      newSection = this.SECTION_ABOUT;
    } else if (
      scrollPosition > this.offsets[this.SECTION_EXPERIENCE] &&
      scrollPosition < this.offsets[this.SECTION_PROJECTS]
    ) {
      newSection = this.SECTION_EXPERIENCE;
    } else if (scrollPosition > this.offsets[this.SECTION_PROJECTS]) {
      newSection = this.SECTION_PROJECTS;
    }

    if (newSection !== this.currentSection) {
      this.ngZone.run(() => {
        this.currentSection = newSection;
      });
    }
  }

  articles: Article[] = [];

  title = 'portfolio-website';
}
