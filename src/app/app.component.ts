import { NavigationComponent } from './navigation/navigation.component';
import { Component, AfterViewInit, Inject, NgZone, PLATFORM_ID } from '@angular/core';
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
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone,
    public screen: ScreenSizeService
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.offsets = {
        ABOUT: this.calculateOffset('ABOUT', 70),
        EXPERIENCE: this.calculateOffset('EXPERIENCE', 70),
        PROJECTS: this.calculateOffset('PROJECTS', 70),
      };

      const follower = this.document.querySelector(
        '.mouse-follower'
      ) as HTMLElement;
      if (follower) {
        follower.style.display = 'block';

        this.ngZone.runOutsideAngular(() => {
          this.document.addEventListener('mousemove', (e: MouseEvent) => {
            follower.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
          });
        });
      }

      this.ngZone.runOutsideAngular(() => {
        window.addEventListener('scroll', () => {
          const scrollPosition =
            window.pageYOffset ||
            this.document.documentElement.scrollTop ||
            this.document.body.scrollTop ||
            0;

          let newSection = this.currentSection;

          if (
            scrollPosition > this.offsets['ABOUT'] &&
            scrollPosition < this.offsets['EXPERIENCE']
          ) {
            newSection = 'ABOUT';
          } else if (
            scrollPosition > this.offsets['EXPERIENCE'] &&
            scrollPosition < this.offsets['PROJECTS']
          ) {
            newSection = 'EXPERIENCE';
          } else if (scrollPosition > this.offsets['PROJECTS']) {
            newSection = 'PROJECTS';
          }

          if (newSection !== this.currentSection) {
            this.ngZone.run(() => {
              this.currentSection = newSection;
            });
          }
        });
      });
    }
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
