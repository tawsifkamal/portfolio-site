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
  private observer: IntersectionObserver | null = null;
  private mouseMoveListener: (() => void) | null = null;
  private sectionRatios = new Map<string, number>();

  currentSection = 'ABOUT';

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
      this.ngZone.runOutsideAngular(() => {
        const follower = this.document.querySelector('.mouse-follower') as HTMLElement;
        if (follower) {
          follower.style.display = 'block';
          this.mouseMoveListener = this.renderer.listen(this.document, 'mousemove', (e: MouseEvent) => {
            follower.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
          });
        }

        const thresholds = Array.from({ length: 11 }, (_, i) => i / 10);
        this.observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              this.sectionRatios.set(entry.target.id, entry.intersectionRatio);
            });

            let maxRatio = 0;
            let maxSection = this.currentSection;

            for (const [id, ratio] of this.sectionRatios.entries()) {
              if (ratio > maxRatio) {
                maxRatio = ratio;
                maxSection = id;
              }
            }

            if (maxRatio > 0 && maxSection !== this.currentSection) {
              this.ngZone.run(() => {
                this.currentSection = maxSection;
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
            this.sectionRatios.set(id, 0);
            this.observer?.observe(element);
          }
        });
      });
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.mouseMoveListener) {
      this.mouseMoveListener();
    }
  }

  navigateToSection(section: string) {
    this.document.getElementById(section)?.scrollIntoView();
  }
}
