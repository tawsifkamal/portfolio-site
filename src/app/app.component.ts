import { NavigationComponent } from './navigation/navigation.component';
import { Component, AfterViewInit, Inject, NgZone, OnDestroy, Renderer2 } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
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

  private removeScrollListener: (() => void) | undefined;
  private removeMouseMoveListener: (() => void) | undefined;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public screen: ScreenSizeService,
    private portfolioService: PortfolioService,
    private ngZone: NgZone,
    private renderer: Renderer2
  ) {
    this.articles = this.portfolioService.articles;
  }

  ngAfterViewInit() {
    this.offsets = {
      ABOUT: this.calculateOffset('ABOUT', 70),
      EXPERIENCE: this.calculateOffset('EXPERIENCE', 70),
      PROJECTS: this.calculateOffset('PROJECTS', 70),
    };

    const follower = this.document.querySelector('.mouse-follower') as HTMLElement;
    if (follower) {
      follower.style.display = 'block';
    }

    this.ngZone.runOutsideAngular(() => {
      this.removeScrollListener = this.renderer.listen('window', 'scroll', () => {
         this.onWindowScroll();
      });

      this.removeMouseMoveListener = this.renderer.listen('document', 'mousemove', (e: MouseEvent) => {
        if (follower) {
           follower.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.removeScrollListener) {
      this.removeScrollListener();
    }
    if (this.removeMouseMoveListener) {
      this.removeMouseMoveListener();
    }
  }

  private calculateOffset(sectionId: string, padding: number): number {
    const element = this.document.getElementById(sectionId);
    return element ? element.offsetTop - padding : 0;
  }

  currentSection = 'ABOUT';

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

  title = 'portfolio-website';
}
