import { NavigationComponent } from './navigation/navigation.component';
import { Component, HostListener, AfterViewInit, Inject, NgZone, PLATFORM_ID, Renderer2, OnDestroy } from '@angular/core';
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

  private readonly OFFSET_PADDING = 70;
  private mouseMoveListener: (() => void) | undefined;

  articles: Article[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public screen: ScreenSizeService,
    private portfolioService: PortfolioService,
    private ngZone: NgZone,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.articles = this.portfolioService.articles;
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.offsets = {
        ABOUT: this.calculateOffset('ABOUT', this.OFFSET_PADDING),
        EXPERIENCE: this.calculateOffset('EXPERIENCE', this.OFFSET_PADDING),
        PROJECTS: this.calculateOffset('PROJECTS', this.OFFSET_PADDING),
      };

      const follower = this.document.querySelector('.mouse-follower');
      if (follower) {
        this.renderer.setStyle(follower, 'display', 'block');

        this.ngZone.runOutsideAngular(() => {
          this.mouseMoveListener = this.renderer.listen(this.document, 'mousemove', (e: MouseEvent) => {
            this.renderer.setStyle(
              follower,
              'background',
              `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`
            );
          });
        });
      }
    }
  }

  ngOnDestroy() {
    if (this.mouseMoveListener) {
      this.mouseMoveListener();
    }
  }

  private calculateOffset(sectionId: string, padding: number): number {
    const element = this.document.getElementById(sectionId);
    return element ? element.offsetTop - padding : 0;
  }

  currentSection = 'ABOUT';

  navigateToSection(section: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.document.getElementById(section)?.scrollIntoView();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const scrollPosition =
      window.pageYOffset ||
      this.document.documentElement.scrollTop ||
      this.document.body.scrollTop ||
      0;

    if (
      scrollPosition > this.offsets['ABOUT'] &&
      scrollPosition < this.offsets['EXPERIENCE']
    ) {
      this.currentSection = 'ABOUT';
    } else if (
      scrollPosition > this.offsets['EXPERIENCE'] &&
      scrollPosition < this.offsets['PROJECTS']
    ) {
      this.currentSection = 'EXPERIENCE';
    } else if (scrollPosition > this.offsets['PROJECTS']) {
      this.currentSection = 'PROJECTS';
    }
  }

  title = 'portfolio-website';
}
