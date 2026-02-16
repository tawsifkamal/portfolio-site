import { NavigationComponent } from './navigation/navigation.component';
import { Component, AfterViewInit, Inject, ViewChild, ElementRef, NgZone, OnDestroy, Renderer2, PLATFORM_ID } from '@angular/core';
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
  @ViewChild('mouseFollower') mouseFollower: ElementRef;

  offsets: Record<string, number> = {
    ABOUT: 0,
    EXPERIENCE: 0,
    PROJECTS: 0,
  };

  articles: Article[];
  title = 'portfolio-website';
  currentSection = 'ABOUT';
  private unlisteners: (() => void)[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    public screen: ScreenSizeService,
    private portfolioService: PortfolioService,
    private ngZone: NgZone,
    private renderer: Renderer2
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

      if (this.mouseFollower) {
        this.renderer.setStyle(this.mouseFollower.nativeElement, 'display', 'block');
      }

      this.setupEventListeners();
    }
  }

  private setupEventListeners() {
    this.ngZone.runOutsideAngular(() => {
      // Mouse Move Listener
      const mouseMoveListener = this.renderer.listen(this.document, 'mousemove', (e: MouseEvent) => {
        if (this.mouseFollower) {
          this.renderer.setStyle(
            this.mouseFollower.nativeElement,
            'background',
            `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`
          );
        }
      });
      this.unlisteners.push(mouseMoveListener);

      // Scroll Listener
      const scrollListener = this.renderer.listen(window, 'scroll', () => {
        this.onWindowScroll();
      });
      this.unlisteners.push(scrollListener);
    });
  }

  private calculateOffset(sectionId: string, padding: number): number {
    const element = this.document.getElementById(sectionId);
    return element ? element.offsetTop - padding : 0;
  }

  navigateToSection(section: string) {
    this.document.getElementById(section)?.scrollIntoView();
  }

  onWindowScroll() {
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

  ngOnDestroy() {
    this.unlisteners.forEach((unlisten) => unlisten());
  }
}
