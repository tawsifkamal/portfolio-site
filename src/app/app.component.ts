import { NavigationComponent } from './navigation/navigation.component';
import { Component, AfterViewInit, Inject, PLATFORM_ID, Renderer2, NgZone, OnDestroy } from '@angular/core';
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
  private unlistenMouseMove?: () => void;
  private observer?: IntersectionObserver;
  private intersectionRatios = new Map<string, number>();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    public screen: ScreenSizeService,
    private renderer: Renderer2,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();

      const follower = this.document.querySelector(
        '.mouse-follower'
      ) as HTMLElement;

      if (follower) {
        follower.style.display = 'block';

        this.ngZone.runOutsideAngular(() => {
          this.unlistenMouseMove = this.renderer.listen(this.document, 'mousemove', (e: MouseEvent) => {
            follower.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
          });
        });
      }
    }
  }

  private setupIntersectionObserver() {
    const thresholds = Array.from({ length: 11 }, (_, i) => i * 0.1); // [0.0, 0.1, ..., 1.0]

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.intersectionRatios.set(entry.target.id, entry.intersectionRatio);
        });

        // Find the section with the highest intersection ratio
        let maxRatio = 0;
        let mostVisibleSection = this.currentSection;

        this.intersectionRatios.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            mostVisibleSection = id;
          }
        });

        if (this.currentSection !== mostVisibleSection) {
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

    const sections = ['ABOUT', 'EXPERIENCE', 'PROJECTS'];
    sections.forEach((id) => {
      const element = this.document.getElementById(id);
      if (element) {
        this.intersectionRatios.set(id, 0);
        this.observer?.observe(element);
      }
    });
  }

  currentSection = 'ABOUT';

  navigateToSection(section: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.document.getElementById(section)?.scrollIntoView();
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

  ngOnDestroy() {
    if (this.unlistenMouseMove) {
      this.unlistenMouseMove();
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
