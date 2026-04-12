import { NavigationComponent } from './navigation/navigation.component';
import { Component, AfterViewInit, Inject, Renderer2, NgZone, PLATFORM_ID, OnDestroy } from '@angular/core';
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
  private unlistenMouseMove?: () => void;
  private observer?: IntersectionObserver;
  private sectionRatios = new Map<string, number>();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public screen: ScreenSizeService,
    private renderer: Renderer2,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const follower = this.document.querySelector('.mouse-follower') as HTMLElement | null;
      if (follower) {
        follower.style.display = 'block';

        this.ngZone.runOutsideAngular(() => {
          this.unlistenMouseMove = this.renderer.listen('document', 'mousemove', (e: MouseEvent) => {
            follower.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
          });
        });
      }

      const thresholds = [];
      for (let i = 0; i <= 1.0; i += 0.1) {
        thresholds.push(i);
      }

      this.observer = new IntersectionObserver(
        (entries) => {
          this.ngZone.run(() => {
            entries.forEach((entry) => {
              this.sectionRatios.set(entry.target.id, entry.intersectionRatio);
            });

            let highestRatio = 0;
            let currentActive = this.currentSection;

            for (const [id, ratio] of this.sectionRatios.entries()) {
              if (ratio > highestRatio) {
                highestRatio = ratio;
                currentActive = id;
              }
            }

            if (highestRatio > 0 && currentActive !== this.currentSection) {
              this.currentSection = currentActive;
            }
          });
        },
        { threshold: thresholds }
      );

      ['ABOUT', 'EXPERIENCE', 'PROJECTS'].forEach((id) => {
        const el = this.document.getElementById(id);
        if (el) {
          this.observer?.observe(el);
          this.sectionRatios.set(id, 0);
        }
      });
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

  navigateToSection(section: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
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
