import { NavigationComponent } from './navigation/navigation.component';
import { Component, AfterViewInit, Inject, NgZone, Renderer2, PLATFORM_ID } from '@angular/core';
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
  offsets = {
    ABOUT: 0,
    EXPERIENCE: 0,
    PROJECTS: 0,
  };

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public screen: ScreenSizeService,
    private ngZone: NgZone,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit() {
    this.offsets = {
      ABOUT: this.calculateOffset('ABOUT', 70),
      EXPERIENCE: this.calculateOffset('EXPERIENCE', 70),
      PROJECTS: this.calculateOffset('PROJECTS', 70),
    };

    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
      this.setupMouseFollower();
    }
  }

  private setupMouseFollower() {
    const follower = this.document.querySelector(
      '.mouse-follower'
    ) as HTMLElement;

    if (follower) {
      this.renderer.setStyle(follower, 'display', 'block');
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

  private setupIntersectionObserver() {
    this.ngZone.runOutsideAngular(() => {
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: Array.from({ length: 11 }, (_, i) => i * 0.1) // [0, 0.1, ..., 1.0]
      };

      const sectionRatios = new Map<string, number>();

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          sectionRatios.set(entry.target.id, entry.intersectionRatio);
        });

        // Determine the section with the highest intersection ratio
        let maxRatio = 0;
        let activeSection = this.currentSection;

        sectionRatios.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            activeSection = id;
          }
        });

        if (maxRatio > 0 && activeSection !== this.currentSection) {
          this.ngZone.run(() => {
            this.currentSection = activeSection;
          });
        }
      }, observerOptions);

      ['ABOUT', 'EXPERIENCE', 'PROJECTS'].forEach(id => {
        const element = this.document.getElementById(id);
        if (element) {
          observer.observe(element);
        }
      });
    });
  }

  private calculateOffset(sectionId: string, padding: number): number {
    const element = this.document.getElementById(sectionId);
    return element ? element.offsetTop - padding : 0;
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
