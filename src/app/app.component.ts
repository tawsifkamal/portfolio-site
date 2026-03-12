import { NavigationComponent } from './navigation/navigation.component';
import { Component, AfterViewInit, Inject, NgZone, Renderer2, PLATFORM_ID, OnDestroy } from '@angular/core';
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
  private observer: IntersectionObserver | undefined;
  private unlistenMouseMove: (() => void) | undefined;

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
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    };

    let maxRatio = 0;
    let visibleSection = this.currentSection;

    this.observer = new IntersectionObserver((entries) => {
      this.ngZone.runOutsideAngular(() => {
        let changed = false;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
             if (entry.intersectionRatio > maxRatio) {
               maxRatio = entry.intersectionRatio;
               visibleSection = entry.target.id;
               changed = true;
             }
          } else if (entry.target.id === visibleSection) {
            maxRatio = 0;
            // When the currently fully visible section starts hiding, re-evaluate others or keep the last known if scrolling down past all
          }
        });

        // This logic is slightly simplified; we will want to just find the maximum intersecting entry
        const intersectingEntries = entries.filter(e => e.isIntersecting);
        if (intersectingEntries.length > 0) {
           const maxEntry = intersectingEntries.reduce((prev, current) => (prev.intersectionRatio > current.intersectionRatio) ? prev : current);
           if (this.currentSection !== maxEntry.target.id) {
               this.ngZone.run(() => {
                 this.currentSection = maxEntry.target.id;
               });
           }
        }
      });
    }, options);

    const sections = ['ABOUT', 'EXPERIENCE', 'PROJECTS'];
    sections.forEach((id) => {
      const element = this.document.getElementById(id);
      if (element) {
        this.observer!.observe(element);
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
