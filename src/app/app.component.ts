import { NavigationComponent } from './navigation/navigation.component';
import { Component, AfterViewInit, Inject, OnDestroy, NgZone, signal, Renderer2, PLATFORM_ID } from '@angular/core';
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
  currentSection = signal('ABOUT');
  title = 'portfolio-website';
  private observer: IntersectionObserver | undefined;
  private mouseMoveListener: (() => void) | undefined;

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
      this.setupIntersectionObserver();
      this.setupMouseFollower();
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.mouseMoveListener) {
      this.mouseMoveListener();
    }
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Trigger when element is in the middle of viewport
      threshold: 0,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.currentSection.set(entry.target.id);
        }
      });
    }, options);

    const sections = ['ABOUT', 'EXPERIENCE', 'PROJECTS'];
    sections.forEach((id) => {
      const element = this.document.getElementById(id);
      if (element) {
        this.observer?.observe(element);
      }
    });
  }

  private setupMouseFollower() {
    const follower = this.document.querySelector('.mouse-follower') as HTMLElement;
    if (!follower) return;

    follower.style.display = 'block';

    this.ngZone.runOutsideAngular(() => {
      this.mouseMoveListener = this.renderer.listen('document', 'mousemove', (e: MouseEvent) => {
        follower.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
      });
    });
  }

  navigateToSection(section: string) {
    this.document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }
}
