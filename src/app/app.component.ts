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

  private observer: IntersectionObserver | null = null;
  private intersectionRatios = new Map<string, number>();
  private removeMouseMoveListener?: () => void;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    public screen: ScreenSizeService,
    private ngZone: NgZone,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initMouseFollower();
      this.initIntersectionObserver();
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.removeMouseMoveListener) {
      this.removeMouseMoveListener();
    }
  }

  private initMouseFollower() {
    const follower = this.document.querySelector('.mouse-follower') as HTMLElement;
    if (follower) {
      this.renderer.setStyle(follower, 'display', 'block');
      this.ngZone.runOutsideAngular(() => {
        this.removeMouseMoveListener = this.renderer.listen('document', 'mousemove', (e: MouseEvent) => {
          this.renderer.setStyle(
            follower,
            'background',
            `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`
          );
        });
      });
    }
  }

  private initIntersectionObserver() {
    const thresholds = [];
    for (let i = 0; i <= 1.0; i += 0.05) {
      thresholds.push(i);
    }

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: thresholds,
    };

    this.observer = new IntersectionObserver((entries) => {
      this.ngZone.run(() => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (id) {
            this.intersectionRatios.set(id, entry.intersectionRatio);
          }
        });

        let maxRatio = 0;
        let mostVisibleSection = this.currentSection;

        this.intersectionRatios.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            mostVisibleSection = id;
          }
        });

        if (maxRatio > 0 && this.currentSection !== mostVisibleSection) {
          this.currentSection = mostVisibleSection;
        }
      });
    }, options);

    ['ABOUT', 'EXPERIENCE', 'PROJECTS'].forEach((id) => {
      const element = this.document.getElementById(id);
      if (element) {
        this.observer?.observe(element);
        this.intersectionRatios.set(id, 0);
      }
    });
  }

  navigateToSection(section: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.document.getElementById(section)?.scrollIntoView();
    }
  }
}
