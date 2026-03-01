import { NavigationComponent } from './navigation/navigation.component';
import { Component, AfterViewInit, Inject, OnDestroy, NgZone, ChangeDetectionStrategy, signal, Renderer2, PLATFORM_ID } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'portfolio-website';
  currentSection = signal<string>('ABOUT');
  private observer: IntersectionObserver | undefined;
  private mouseMoveListener: (() => void) | undefined;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    public screen: ScreenSizeService,
    public portfolio: PortfolioService,
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
      rootMargin: '0px',
      threshold: 0.5,
    };

    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (['ABOUT', 'EXPERIENCE', 'PROJECTS'].includes(id)) {
              this.currentSection.set(id);
            }
          }
        });
      }, options);

      const sections = this.document.querySelectorAll('#ABOUT, #EXPERIENCE, #PROJECTS');
      sections.forEach((section) => {
        this.observer?.observe(section);
      });
    }
  }

  private setupMouseFollower() {
    const follower = this.document.querySelector('.mouse-follower') as HTMLElement;
    if (follower) {
      follower.style.display = 'block';
      this.ngZone.runOutsideAngular(() => {
        this.mouseMoveListener = this.renderer.listen(this.document, 'mousemove', (e: MouseEvent) => {
          follower.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
        });
      });
    }
  }

  navigateToSection(section: string) {
    const element = this.document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
