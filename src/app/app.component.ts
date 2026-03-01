import { NavigationComponent } from './navigation/navigation.component';
import { Component, AfterViewInit, Inject, OnDestroy, NgZone, Renderer2, PLATFORM_ID } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { WorkExperienceSectionComponent } from './work-experience-section/work-experience-section.component';
import { TagComponent } from './tag/tag.component';
import { ProjectSectionComponent } from './project-section/project-section.component';
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
  private observer: IntersectionObserver | undefined;
  private mouseListenerCleanup: (() => void) | undefined;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    public screen: ScreenSizeService,
    public portfolioService: PortfolioService,
    private ngZone: NgZone,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const follower = this.document.querySelector(
        '.mouse-follower'
      ) as HTMLElement;

      if (follower) {
        follower.style.display = 'block';

        this.ngZone.runOutsideAngular(() => {
          this.mouseListenerCleanup = this.renderer.listen(
            this.document,
            'mousemove',
            (e: MouseEvent) => {
              follower.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
            }
          );
        });
      }

      this.initScrollSpy();
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    if (this.mouseListenerCleanup) {
      this.mouseListenerCleanup();
    }
  }

  private initScrollSpy() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.currentSection = entry.target.id;
        }
      });
    }, options);

    ['ABOUT', 'EXPERIENCE', 'PROJECTS'].forEach((id) => {
      const element = this.document.getElementById(id);
      if (element) {
        this.observer?.observe(element);
      }
    });
  }

  currentSection = 'ABOUT';

  navigateToSection(section: string) {
    this.document.getElementById(section)?.scrollIntoView();
  }




  title = 'portfolio-website';
}
