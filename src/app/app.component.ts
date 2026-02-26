import { NavigationComponent } from './navigation/navigation.component';
import { Component, AfterViewInit, Inject, PLATFORM_ID, NgZone, Renderer2, OnDestroy } from '@angular/core';
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
  providers: [ScreenSizeService],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  currentSection = 'ABOUT';
  title = 'portfolio-website';
  private observer: IntersectionObserver | null = null;
  private mouseMoveListener: (() => void) | null = null;

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
      rootMargin: '0px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Need to run inside zone because currentSection updates the view
            this.ngZone.run(() => {
                this.currentSection = entry.target.id;
            });
        }
      });
    }, options);

    const sections = ['ABOUT', 'EXPERIENCE', 'PROJECTS'];
    sections.forEach(id => {
      const element = this.document.getElementById(id);
      if (element) {
        this.observer?.observe(element);
      }
    });
  }

  private setupMouseFollower() {
    const follower = this.document.querySelector('.mouse-follower');
    if (follower) {
        this.renderer.setStyle(follower, 'display', 'block');

        this.ngZone.runOutsideAngular(() => {
            this.mouseMoveListener = this.renderer.listen(this.document, 'mousemove', (e: MouseEvent) => {
                this.renderer.setStyle(follower, 'background', `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`);
            });
        });
    }
  }

  navigateToSection(section: string) {
    if (isPlatformBrowser(this.platformId)) {
        this.document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
