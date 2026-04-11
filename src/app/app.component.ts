import { NavigationComponent } from './navigation/navigation.component';
import { Component, HostListener, AfterViewInit, Inject, PLATFORM_ID, NgZone, Renderer2 } from '@angular/core';
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
  currentSection = 'ABOUT';
  title = 'portfolio-website';
  private intersectionRatios = new Map<string, number>();

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

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    public screen: ScreenSizeService,
    private ngZone: NgZone,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
      this.setupMouseMoveListener();
    }
  }

  private setupIntersectionObserver() {
    const thresholds = [];
    for (let i = 0; i <= 1.0; i += 0.1) {
      thresholds.push(i);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.intersectionRatios.set(entry.target.id, entry.intersectionRatio);
        });

        let maxRatio = 0;
        let maxSection = this.currentSection;

        this.intersectionRatios.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            maxSection = id;
          }
        });

        if (maxRatio > 0 && this.currentSection !== maxSection) {
          // Wrap in NgZone to trigger change detection
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
        observer.observe(element);
        this.intersectionRatios.set(id, 0);
      }
    });
  }

  private setupMouseMoveListener() {
    const follower = this.document.querySelector('.mouse-follower') as HTMLElement;
    if (follower) {
      follower.style.display = 'block';
      this.ngZone.runOutsideAngular(() => {
        this.renderer.listen('document', 'mousemove', (e: MouseEvent) => {
          this.renderer.setStyle(
            follower,
            'background',
            `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`
          );
        });
      });
    }
  }

  navigateToSection(section: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.document.getElementById(section)?.scrollIntoView();
    }
  }
}
