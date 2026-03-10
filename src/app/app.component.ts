import { NavigationComponent } from './navigation/navigation.component';
import { Component, AfterViewInit, OnDestroy, Inject, NgZone, Renderer2, PLATFORM_ID } from '@angular/core';
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
  private unlistenMouseMove: (() => void) | null = null;
  private observer: IntersectionObserver | null = null;

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

        this.ngZone.runOutsideAngular(() => {
          this.unlistenMouseMove = this.renderer.listen(this.document, 'mousemove', (e: MouseEvent) => {
            this.renderer.setStyle(
              follower,
              'background',
              `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`
            );
          });
        });
      }

      this.setupScrollSpy();
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

  private setupScrollSpy() {
    const sections = ['ABOUT', 'EXPERIENCE', 'PROJECTS'];
    const sectionElements = sections.map((id) => this.document.getElementById(id)).filter((el) => el !== null) as HTMLElement[];

    if (sectionElements.length === 0) return;

    // Use a large number of thresholds for more accurate visibility detection
    const thresholds: number[] = [];
    for (let i = 0; i <= 1.0; i += 0.05) {
      thresholds.push(i);
    }

    const sectionVisibility = new Map<string, number>();

    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            sectionVisibility.set(entry.target.id, entry.intersectionRatio);
          });

          let maxVisibleSection = this.currentSection;
          let maxRatio = 0;

          sectionElements.forEach((el) => {
            const ratio = sectionVisibility.get(el.id) || 0;
            if (ratio > maxRatio) {
              maxRatio = ratio;
              maxVisibleSection = el.id;
            }
          });

          if (maxRatio > 0 && maxVisibleSection !== this.currentSection) {
            this.ngZone.run(() => {
              this.currentSection = maxVisibleSection;
            });
          }
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: thresholds,
        }
      );

      sectionElements.forEach((el) => {
        this.observer?.observe(el);
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
