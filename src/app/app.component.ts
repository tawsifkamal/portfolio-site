import { NavigationComponent } from './navigation/navigation.component';
import { Component, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, NgZone, Renderer2 } from '@angular/core';
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
  private followerElement: HTMLElement | null = null;

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

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone,
    private renderer: Renderer2,
    public screen: ScreenSizeService
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.followerElement = this.document.querySelector('.mouse-follower') as HTMLElement;
      if (this.followerElement) {
        this.renderer.setStyle(this.followerElement, 'display', 'block');
      }

      this.ngZone.runOutsideAngular(() => {
        this.removeMouseMoveListener = this.renderer.listen('document', 'mousemove', (e: MouseEvent) => {
          if (this.followerElement) {
            this.renderer.setStyle(
              this.followerElement,
              'background',
              `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`
            );
          }
        });

        // Setup IntersectionObserver for scroll spy
        const thresholds = [];
        for (let i = 0; i <= 1.0; i += 0.05) {
          thresholds.push(i);
        }

        const ratios: Record<string, number> = {};
        this.intersectionObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              ratios[entry.target.id] = entry.intersectionRatio;
            });

            let maxRatio = 0;
            let currentActive = this.currentSection;

            for (const [id, ratio] of Object.entries(ratios)) {
              if (ratio > maxRatio) {
                maxRatio = ratio;
                currentActive = id;
              }
            }

            if (currentActive !== this.currentSection) {
              this.ngZone.run(() => {
                this.currentSection = currentActive;
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
        sections.forEach(id => {
          const el = this.document.getElementById(id);
          if (el) {
            this.intersectionObserver!.observe(el);
          }
        });
      });
    }
  }

  ngOnDestroy() {
    if (this.removeMouseMoveListener) {
      this.removeMouseMoveListener();
      this.removeMouseMoveListener = null;
    }
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }
  }

  navigateToSection(section: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.document.getElementById(section)?.scrollIntoView();
    }
  }
}
