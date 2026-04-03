import { NavigationComponent } from './navigation/navigation.component';
import {
  Component,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  NgZone,
  Renderer2,
} from '@angular/core';
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
  private follower: HTMLElement | null = null;
  private intersectionRatios = new Map<string, number>();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    public screen: ScreenSizeService,
    private ngZone: NgZone,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.follower = this.document.querySelector(
        '.mouse-follower'
      ) as HTMLElement;
      if (this.follower) {
        this.follower.style.display = 'block';
      }

      this.ngZone.runOutsideAngular(() => {
        this.setupMouseMoveListener();
        this.setupIntersectionObserver();
      });
    }
  }

  private setupMouseMoveListener() {
    this.renderer.listen(this.document, 'mousemove', (e: MouseEvent) => {
      if (this.follower) {
        this.follower.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
      }
    });
  }

  private setupIntersectionObserver() {
    const sections = ['ABOUT', 'EXPERIENCE', 'PROJECTS'];
    const thresholds = Array.from({ length: 11 }, (_, i) => i / 10);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.intersectionRatios.set(entry.target.id, entry.intersectionRatio);
        });
        this.updateCurrentSection();
      },
      { threshold: thresholds }
    );

    sections.forEach((id) => {
      const element = this.document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });
  }

  private updateCurrentSection() {
    let maxRatio = -1;
    let activeSection = this.currentSection;

    this.intersectionRatios.forEach((ratio, id) => {
      if (ratio > maxRatio) {
        maxRatio = ratio;
        activeSection = id;
      }
    });

    if (activeSection !== this.currentSection) {
      this.ngZone.run(() => {
        this.currentSection = activeSection;
      });
    }
  }

  currentSection = 'ABOUT';

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
