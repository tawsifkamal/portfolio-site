import { NavigationComponent } from './navigation/navigation.component';
import { Component, AfterViewInit, Inject, NgZone, Renderer2, PLATFORM_ID, OnDestroy } from '@angular/core';
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
  private intersectionRatios = new Map<string, number>();
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
        follower.style.display = 'block';
      }

      this.setupIntersectionObserver();
      this.setupMouseMoveListener(follower);
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
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: Array.from({ length: 11 }, (_, i) => i * 0.1), // [0.0, 0.1, ..., 1.0]
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      this.ngZone.run(() => {
        entries.forEach(entry => {
          this.intersectionRatios.set(entry.target.id, entry.intersectionRatio);
        });

        let maxRatio = 0;
        let visibleSection = this.currentSection;

        for (const [id, ratio] of this.intersectionRatios.entries()) {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            visibleSection = id;
          }
        }

        if (maxRatio > 0 && this.currentSection !== visibleSection) {
            this.currentSection = visibleSection;
        }
      });
    }, options);

    ['ABOUT', 'EXPERIENCE', 'PROJECTS'].forEach(id => {
      const element = this.document.getElementById(id);
      if (element) {
        this.intersectionObserver?.observe(element);
        this.intersectionRatios.set(id, 0);
      }
    });
  }

  private setupMouseMoveListener(follower: HTMLElement | null) {
    if (!follower) return;

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

  title = 'portfolio-website';
}
