import { NavigationComponent } from './navigation/navigation.component';
import { Component, HostListener, AfterViewInit, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
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
    public screen: ScreenSizeService
  ) {}

  private mouseFollower: HTMLElement | null = null;
  private observer: IntersectionObserver | null = null;
  private sectionRatios = new Map<string, number>();

  currentSection = 'ABOUT';

  ngAfterViewInit() {
    this.mouseFollower = this.document.querySelector('.mouse-follower');
    if (this.mouseFollower) {
      this.mouseFollower.style.display = 'block';
    }

    if (typeof IntersectionObserver !== 'undefined') {
      const thresholds = [];
      for (let i = 0; i <= 1.0; i += 0.05) {
        thresholds.push(i);
      }

      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            this.sectionRatios.set(entry.target.id, entry.intersectionRatio);
          });

          let maxRatio = 0;
          let activeSection = this.currentSection;

          for (const [id, ratio] of this.sectionRatios.entries()) {
            if (ratio > maxRatio) {
              maxRatio = ratio;
              activeSection = id;
            }
          }

          if (maxRatio > 0 && activeSection !== this.currentSection) {
            this.currentSection = activeSection;
          }
        },
        {
          root: null,
          rootMargin: '-70px 0px 0px 0px',
          threshold: thresholds,
        }
      );

      ['ABOUT', 'EXPERIENCE', 'PROJECTS'].forEach((id) => {
        const element = this.document.getElementById(id);
        if (element) {
          this.observer?.observe(element);
          this.sectionRatios.set(id, 0);
        }
      });
    }
  }

  navigateToSection(section: string) {
    this.document.getElementById(section)?.scrollIntoView();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (this.mouseFollower) {
      this.mouseFollower.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
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
