import { NavigationComponent } from './navigation/navigation.component';
import { Component, HostListener, AfterViewInit, OnDestroy, Inject, NgZone, Renderer2, PLATFORM_ID } from '@angular/core';
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
  private removeMouseMoveListener: (() => void) | null = null;

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
      this.setupMouseMoveListener();
    }
  }

  ngOnDestroy() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    if (this.removeMouseMoveListener) {
      this.removeMouseMoveListener();
    }
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      // By using a threshold array, we trigger events at multiple intersection ratios
      // allowing us to more accurately determine the most visible section.
      threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
    };

    const sectionRatios: Record<string, number> = {
      ABOUT: 0,
      EXPERIENCE: 0,
      PROJECTS: 0
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        if (id === 'ABOUT' || id === 'EXPERIENCE' || id === 'PROJECTS') {
          sectionRatios[id] = entry.intersectionRatio;
        }
      });

      // Find the section with the highest intersection ratio
      let maxRatio = 0;
      let mostVisibleSection = this.currentSection;

      for (const [id, ratio] of Object.entries(sectionRatios)) {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          mostVisibleSection = id;
        }
      }

      if (mostVisibleSection !== this.currentSection && maxRatio > 0.1) {
        this.ngZone.run(() => {
          this.currentSection = mostVisibleSection;
        });
      }
    }, options);

    ['ABOUT', 'EXPERIENCE', 'PROJECTS'].forEach(id => {
      const element = this.document.getElementById(id);
      if (element) {
        this.intersectionObserver!.observe(element);
      }
    });
  }

  private setupMouseMoveListener() {
    const follower = this.document.querySelector('.mouse-follower') as HTMLElement;
    if (!follower) return;

    this.ngZone.runOutsideAngular(() => {
      this.removeMouseMoveListener = this.renderer.listen('document', 'mousemove', (e: MouseEvent) => {
        follower.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
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
