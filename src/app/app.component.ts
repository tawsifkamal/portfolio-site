import { NavigationComponent } from './navigation/navigation.component';
import { Component, AfterViewInit, Inject, NgZone, PLATFORM_ID, OnDestroy } from '@angular/core';
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
  private intersectionObserver: IntersectionObserver | null = null;
  private mouseMoveListener: ((e: MouseEvent) => void) | null = null;
  private follower: HTMLElement | null = null;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    public screen: ScreenSizeService,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.follower = this.document.querySelector('.mouse-follower') as HTMLElement;
      if (this.follower) {
        this.follower.style.display = 'block';
      }

      this.setupIntersectionObserver();
      this.setupMouseMoveListener();
    }
  }

  ngOnDestroy() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    if (this.mouseMoveListener) {
      this.document.removeEventListener('mousemove', this.mouseMoveListener);
    }
  }

  private setupIntersectionObserver() {
    const sectionIds = ['ABOUT', 'EXPERIENCE', 'PROJECTS'];
    const thresholds = Array.from({ length: 11 }, (_, i) => i / 10); // [0.0, 0.1, ..., 1.0]

    // Use a map to keep track of the intersection ratios for each section
    const sectionRatios = new Map<string, number>();

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          sectionRatios.set(entry.target.id, entry.intersectionRatio);
        });

        // Find the section with the highest intersection ratio
        let maxRatio = 0;
        let mostVisibleSection = this.currentSection;

        sectionRatios.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            mostVisibleSection = id;
          }
        });

        // Only update if we have a clearly visible section (ratio > 0)
        if (maxRatio > 0 && this.currentSection !== mostVisibleSection) {
          this.ngZone.run(() => {
            this.currentSection = mostVisibleSection;
          });
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: thresholds,
      }
    );

    sectionIds.forEach((id) => {
      const element = this.document.getElementById(id);
      if (element) {
        this.intersectionObserver!.observe(element);
        sectionRatios.set(id, 0); // Initialize map
      }
    });
  }

  private setupMouseMoveListener() {
    this.mouseMoveListener = (e: MouseEvent) => {
      if (this.follower) {
        this.follower.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
      }
    };

    this.ngZone.runOutsideAngular(() => {
      this.document.addEventListener('mousemove', this.mouseMoveListener!);
    });
  }

  navigateToSection(section: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    }
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

  title = 'portfolio-website';
}
