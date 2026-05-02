import { NavigationComponent } from './navigation/navigation.component';
import { Component, HostListener, AfterViewInit, Inject, PLATFORM_ID, Renderer2, NgZone, OnInit, OnDestroy } from '@angular/core';
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
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  offsets = {
    ABOUT: 0,
    EXPERIENCE: 0,
    PROJECTS: 0,
  };

  private mouseFollower: HTMLElement | null = null;
  private observer: IntersectionObserver | null = null;
  private mouseMoveListener: (() => void) | null = null;
  private intersectionRatios = new Map<string, number>();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    public screen: ScreenSizeService,
    private renderer: Renderer2,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
    }
  }

  private setupIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        this.intersectionRatios.set(entry.target.id, entry.intersectionRatio);
      });

      let maxRatio = 0;
      let visibleSection = this.currentSection;

      this.intersectionRatios.forEach((ratio, id) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          visibleSection = id;
        }
      });

      if (maxRatio > 0) {
        this.ngZone.run(() => {
          this.currentSection = visibleSection;
        });
      }
    }, options);
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.mouseFollower = this.document.querySelector('.mouse-follower') as HTMLElement;
      if (this.mouseFollower) {
        this.renderer.setStyle(this.mouseFollower, 'display', 'block');

        this.ngZone.runOutsideAngular(() => {
          this.mouseMoveListener = this.renderer.listen(this.document, 'mousemove', (e: MouseEvent) => {
            if (this.mouseFollower) {
              this.renderer.setStyle(this.mouseFollower, 'background', `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`);
            }
          });
        });
      }

      const sections = ['ABOUT', 'EXPERIENCE', 'PROJECTS'];
      sections.forEach(id => {
        const element = this.document.getElementById(id);
        if (element && this.observer) {
          this.observer.observe(element);
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.mouseMoveListener) {
      this.mouseMoveListener();
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  currentSection = 'ABOUT';

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
