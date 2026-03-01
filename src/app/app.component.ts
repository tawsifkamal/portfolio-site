import { NavigationComponent } from './navigation/navigation.component';
import {
  Component,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  OnDestroy,
  NgZone,
  Renderer2,
} from '@angular/core';
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
  private observer: IntersectionObserver | undefined;
  private mouseMoveUnlistener: (() => void) | undefined;

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
      const follower = this.document.querySelector(
        '.mouse-follower'
      ) as HTMLElement;
      if (follower) {
        follower.style.display = 'block';

        // Run mouse move listener outside of Angular zone
        this.ngZone.runOutsideAngular(() => {
          this.mouseMoveUnlistener = this.renderer.listen(
            this.document,
            'mousemove',
            (e: MouseEvent) => {
              follower.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
            }
          );
        });
      }

      this.setupIntersectionObserver();
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.mouseMoveUnlistener) {
      this.mouseMoveUnlistener();
    }
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Need to run inside Angular zone to update the view
            this.ngZone.run(() => {
              this.currentSection = entry.target.id;
            });
          }
        });
      }, options);

      const sections = ['ABOUT', 'EXPERIENCE', 'PROJECTS'];
      sections.forEach((sectionId) => {
        const element = this.document.getElementById(sectionId);
        if (element) {
          this.observer?.observe(element);
        }
      });
    }
  }

  navigateToSection(section: string) {
    this.document.getElementById(section)?.scrollIntoView();
  }

  title = 'portfolio-website';
}
