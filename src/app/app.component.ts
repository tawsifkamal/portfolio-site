import { NavigationComponent } from './navigation/navigation.component';
import { Component, AfterViewInit, Inject, inject, NgZone, OnDestroy, PLATFORM_ID } from '@angular/core';
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
  screen = inject(ScreenSizeService);
  portfolio = inject(PortfolioService);
  private ngZone = inject(NgZone);
  private platformId = inject(PLATFORM_ID);

  currentSection = 'ABOUT';
  title = 'portfolio-website';

  private intersectionObserver: IntersectionObserver | null = null;
  private mouseMoveListener: (() => void) | null = null;

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.setupScrollSpy();
    this.setupMouseFollower();
  }

  ngOnDestroy() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    if (this.mouseMoveListener) {
      this.mouseMoveListener(); // remove listener
    }
  }

  navigateToSection(section: string) {
    this.document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }

  private setupScrollSpy() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1 // Trigger when 10% of the section is visible
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Run inside zone to update view
          this.ngZone.run(() => {
             this.currentSection = entry.target.id;
          });
        }
      });
    }, options);

    ['ABOUT', 'EXPERIENCE', 'PROJECTS'].forEach(id => {
      const element = this.document.getElementById(id);
      if (element) this.intersectionObserver?.observe(element);
    });
  }

  private setupMouseFollower() {
    const follower = this.document.querySelector('.mouse-follower') as HTMLElement;
    if (!follower) return;

    follower.style.display = 'block';

    this.ngZone.runOutsideAngular(() => {
      const callback = (e: MouseEvent) => {
         follower.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
      };

      this.document.addEventListener('mousemove', callback);
      this.mouseMoveListener = () => this.document.removeEventListener('mousemove', callback);
    });
  }
}
