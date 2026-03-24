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

  private mouseMoveListener?: () => void;
  private observer?: IntersectionObserver;
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
      this.initMouseFollower();
      this.initScrollSpy();
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

  private initMouseFollower() {
    const follower = this.document.querySelector('.mouse-follower') as HTMLElement;
    if (follower) {
      this.renderer.setStyle(follower, 'display', 'block');

      this.ngZone.runOutsideAngular(() => {
        this.mouseMoveListener = this.renderer.listen('document', 'mousemove', (e: MouseEvent) => {
          this.renderer.setStyle(
            follower,
            'background',
            `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`
          );
        });
      });
    }
  }

  private initScrollSpy() {
    const thresholds = Array.from({ length: 11 }, (_, i) => i / 10);
    this.observer = new IntersectionObserver((entries) => {
      this.ngZone.run(() => {
        entries.forEach((entry) => {
          this.sectionRatios.set(entry.target.id, entry.intersectionRatio);
        });

        let maxRatio = 0;
        let mostVisibleSection = this.currentSection;

        this.sectionRatios.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            mostVisibleSection = id;
          }
        });

        if (maxRatio > 0 && this.currentSection !== mostVisibleSection) {
          this.currentSection = mostVisibleSection;
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: thresholds
    });

    const sections = ['ABOUT', 'EXPERIENCE', 'PROJECTS'];
    sections.forEach(id => {
      const el = this.document.getElementById(id);
      if (el) {
        this.observer?.observe(el);
        this.sectionRatios.set(id, 0);
      }
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
