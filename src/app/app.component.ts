import { NavigationComponent } from './navigation/navigation.component';
import { Component, HostListener, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, NgZone, Renderer2 } from '@angular/core';
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
  private sectionRatios = new Map<string, number>();
  private mouseMoveListener: (() => void) | null = null;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone,
    private renderer: Renderer2,
    public screen: ScreenSizeService
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
      this.setupMouseMoveListener();

      const follower = this.document.querySelector('.mouse-follower') as HTMLElement;
      if (follower) {
        follower.style.display = 'block';
      }
    }
  }

  ngOnDestroy() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    if (this.mouseMoveListener) {
      this.mouseMoveListener();
    }
  }

  private setupIntersectionObserver() {
    const thresholds = [];
    for (let i = 0; i <= 1.0; i += 0.01) {
      thresholds.push(i);
    }

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.sectionRatios.set(entry.target.id, entry.intersectionRatio);
      });

      let maxRatio = 0;
      let visibleSection = this.currentSection;

      for (const [id, ratio] of Array.from(this.sectionRatios.entries())) {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          visibleSection = id;
        }
      }

      if (maxRatio > 0 && this.currentSection !== visibleSection) {
        // Must use run since we're probably outside angular from IntersectionObserver
        this.ngZone.run(() => {
          this.currentSection = visibleSection;
        });
      }
    }, {
      root: null,
      rootMargin: '-70px 0px 0px 0px',
      threshold: thresholds
    });

    ['ABOUT', 'EXPERIENCE', 'PROJECTS'].forEach(id => {
      const el = this.document.getElementById(id);
      if (el) {
        this.sectionRatios.set(id, 0);
        this.intersectionObserver?.observe(el);
      }
    });
  }

  private setupMouseMoveListener() {
    const follower = this.document.querySelector('.mouse-follower') as HTMLElement;
    if (follower) {
      this.ngZone.runOutsideAngular(() => {
        this.mouseMoveListener = this.renderer.listen(this.document, 'mousemove', (e: MouseEvent) => {
          follower.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
        });
      });
    }
  }

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
}
