import { NavigationComponent } from './navigation/navigation.component';
import { Component, AfterViewInit, Inject, NgZone, PLATFORM_ID, OnDestroy, Renderer2 } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { WorkExperienceSectionComponent } from './work-experience-section/work-experience-section.component';
import { TagComponent } from './tag/tag.component';
import { ProjectSectionComponent } from './project-section/project-section.component';
import { PortfolioService } from './services/portfolio.service';
import { ScreenSizeService } from './services/screen-size.service';

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

  private unlistenScroll: (() => void) | undefined;
  private unlistenMouseMove: (() => void) | undefined;
  private follower: HTMLElement | null = null;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public screen: ScreenSizeService,
    public portfolioService: PortfolioService,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.offsets = {
        ABOUT: this.calculateOffset('ABOUT', 70),
        EXPERIENCE: this.calculateOffset('EXPERIENCE', 70),
        PROJECTS: this.calculateOffset('PROJECTS', 70),
      };

      this.follower = this.document.querySelector(
        '.mouse-follower'
      ) as HTMLElement;

      if (this.follower) {
        this.follower.style.display = 'block';
      }

      this.ngZone.runOutsideAngular(() => {
        this.unlistenScroll = this.renderer.listen('window', 'scroll', () => {
          this.onWindowScroll();
        });

        this.unlistenMouseMove = this.renderer.listen('document', 'mousemove', (e) => {
          this.onMouseMove(e);
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

  currentSection = 'ABOUT';

  navigateToSection(section: string) {
    if (isPlatformBrowser(this.platformId)) {
        this.document.getElementById(section)?.scrollIntoView();
    }
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

  onMouseMove(e: MouseEvent) {
    if (this.follower) {
        // Update background style for radial gradient to follow the cursor
        this.follower.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
    }
  }
}
