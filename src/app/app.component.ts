import { NavigationComponent } from './navigation/navigation.component';
import { Component, AfterViewInit, Inject, PLATFORM_ID, NgZone, Renderer2, OnDestroy } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { WorkExperienceSectionComponent } from './work-experience-section/work-experience-section.component';
import { TagComponent } from './tag/tag.component';
import { ProjectSectionComponent } from './project-section/project-section.component';
import { Article } from './interfaces/article';
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
    private ngZone: NgZone,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const follower = this.document.querySelector('.mouse-follower') as HTMLElement;
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

      this.setupIntersectionObserver();
    }
  }

  ngOnDestroy() {
    if (this.mouseMoveListener) {
      this.mouseMoveListener();
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver() {
    const sections = ['ABOUT', 'EXPERIENCE', 'PROJECTS'];
    const sectionElements = sections.map((id) => this.document.getElementById(id)).filter((el): el is HTMLElement => el !== null);

    if (sectionElements.length === 0) return;

    // Create array of thresholds from 0 to 1
    const thresholds = Array.from({ length: 101 }, (_, i) => i / 100);

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: thresholds,
    };

    let highestIntersectionRatio = 0;
    let mostVisibleSection = this.currentSection;

    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver((entries) => {
        let changed = false;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > highestIntersectionRatio) {
            highestIntersectionRatio = entry.intersectionRatio;
            mostVisibleSection = entry.target.id;
            changed = true;
          }
        });

        // Decay the highest ratio slightly to allow other sections to become the most visible
        highestIntersectionRatio *= 0.95;

        if (changed && this.currentSection !== mostVisibleSection) {
          this.ngZone.run(() => {
            this.currentSection = mostVisibleSection;
          });
        }
      }, observerOptions);

      sectionElements.forEach((el) => this.observer?.observe(el));
    });
  }

  navigateToSection(section: string) {
    this.document.getElementById(section)?.scrollIntoView();
  }

  articles: Article[] = [
    {
      name: 'An Intuitive Approach To Linear Regression',
      link: 'https://medium.com/swlh/an-intuitive-approach-to-linear-regression-b127da628e45',
    },
    {
      name: 'A Brief Introduction To Classification',
      link: 'https://medium.com/swlh/a-brief-introduction-to-classification-619d38f4880f',
    },
    {
      name: 'An Intuitive Approach To Q-Learning',
      link: 'https://medium.com/swlh/an-intuitive-approach-to-q-learning-p1-acedb6dff968',
    },
    {
      name: 'Hands On Approach To Monte-Carlo Learning',
      link: 'https://medium.com/@tawsifkamal/monte-carlo-reinforcement-learning-a-hands-on-approach-97b412b48293',
    },
  ];
}
