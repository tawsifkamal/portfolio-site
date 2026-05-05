import { NavigationComponent } from './navigation/navigation.component';
import { Component, HostListener, AfterViewInit, Inject, Renderer2, NgZone, PLATFORM_ID, OnDestroy } from '@angular/core';
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
  private mouseMoveListener?: () => void;
  private mouseFollower?: HTMLElement;
  private observer?: IntersectionObserver;
  private intersectionRatios = new Map<string, number>();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public screen: ScreenSizeService,
    private renderer: Renderer2,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();

      this.mouseFollower = this.document.querySelector('.mouse-follower') as HTMLElement;
      if (this.mouseFollower) {
        this.mouseFollower.style.display = 'block';

        this.ngZone.runOutsideAngular(() => {
          this.mouseMoveListener = this.renderer.listen(this.document, 'mousemove', (e: MouseEvent) => {
            if (this.mouseFollower) {
              this.mouseFollower.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
            }
          });
        });
      }
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

  currentSection = 'ABOUT';

  navigateToSection(section: string) {
    this.document.getElementById(section)?.scrollIntoView();
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: Array.from({ length: 11 }, (_, i) => i * 0.1), // [0, 0.1, ..., 1.0]
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        this.intersectionRatios.set(entry.target.id, entry.intersectionRatio);
      });

      let maxRatio = 0;
      let activeSection = this.currentSection;

      for (const [id, ratio] of this.intersectionRatios.entries()) {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          activeSection = id;
        }
      }

      if (maxRatio > 0 && activeSection !== this.currentSection) {
        this.ngZone.run(() => {
          this.currentSection = activeSection;
        });
      }
    }, options);

    const sections = ['ABOUT', 'EXPERIENCE', 'PROJECTS'];
    sections.forEach((id) => {
      const el = this.document.getElementById(id);
      if (el) {
        this.intersectionRatios.set(id, 0);
        this.observer?.observe(el);
      }
    });
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
