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
  private unlistenMouseMove: (() => void) | undefined;
  private observer: IntersectionObserver | undefined;
  private sectionRatios = new Map<string, number>();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone,
    private renderer: Renderer2,
    public screen: ScreenSizeService
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const follower = this.document.querySelector('.mouse-follower') as HTMLElement;
      if (follower) {
        follower.style.display = 'block';

        this.ngZone.runOutsideAngular(() => {
          this.unlistenMouseMove = this.renderer.listen('document', 'mousemove', (e: MouseEvent) => {
            follower.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
          });
        });
      }

      this.setupIntersectionObserver();
    }
  }

  ngOnDestroy() {
    if (this.unlistenMouseMove) {
      this.unlistenMouseMove();
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver() {
    const sections = ['ABOUT', 'EXPERIENCE', 'PROJECTS'];
    const thresholds = [];
    for (let i = 0; i <= 1.0; i += 0.1) {
      thresholds.push(i);
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        this.ngZone.runOutsideAngular(() => {
          entries.forEach(entry => {
            this.sectionRatios.set(entry.target.id, entry.intersectionRatio);
          });

          let maxRatio = 0;
          let mostVisibleSection = this.currentSection;

          for (const section of sections) {
            const ratio = this.sectionRatios.get(section) || 0;
            if (ratio > maxRatio) {
              maxRatio = ratio;
              mostVisibleSection = section;
            }
          }

          if (mostVisibleSection !== this.currentSection && maxRatio > 0) {
            this.ngZone.run(() => {
              this.currentSection = mostVisibleSection;
            });
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: thresholds
      }
    );

    sections.forEach(id => {
      const el = this.document.getElementById(id);
      if (el) {
        this.observer?.observe(el);
      }
    });
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
