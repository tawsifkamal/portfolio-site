import { NavigationComponent } from './navigation/navigation.component';
import { Component, HostListener, AfterViewInit, Inject, NgZone, PLATFORM_ID } from '@angular/core';
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
export class AppComponent implements AfterViewInit {
  private observer: IntersectionObserver | null = null;
  private mouseFollower: HTMLElement | null = null;
  private mouseMoveListener: ((e: MouseEvent) => void) | null = null;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    public screen: ScreenSizeService,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.mouseFollower = this.document.querySelector('.mouse-follower') as HTMLElement;
      if (this.mouseFollower) {
        this.mouseFollower.style.display = 'block';
      }

      this.mouseMoveListener = (e: MouseEvent) => {
        if (this.mouseFollower) {
          this.mouseFollower.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
        }
      };

      this.ngZone.runOutsideAngular(() => {
        this.document.addEventListener('mousemove', this.mouseMoveListener!);

        // Setup Intersection Observer for scroll spy
        const options = {
          root: null,
          rootMargin: '0px',
          threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
        };

        const sectionRatios = new Map<string, number>();

        this.observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            sectionRatios.set(entry.target.id, entry.intersectionRatio);
          });

          let maxRatio = 0;
          let activeSection = this.currentSection;

          sectionRatios.forEach((ratio, id) => {
            if (ratio > maxRatio) {
              maxRatio = ratio;
              activeSection = id;
            }
          });

          if (this.currentSection !== activeSection && maxRatio > 0) {
            this.ngZone.run(() => {
              this.currentSection = activeSection;
            });
          }
        }, options);

        ['ABOUT', 'EXPERIENCE', 'PROJECTS'].forEach(id => {
          const el = this.document.getElementById(id);
          if (el) {
            this.observer!.observe(el);
            sectionRatios.set(id, 0);
          }
        });
      });
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.mouseMoveListener) {
        this.document.removeEventListener('mousemove', this.mouseMoveListener);
      }
      if (this.observer) {
        this.observer.disconnect();
      }
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
