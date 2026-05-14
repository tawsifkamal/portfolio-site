import { NavigationComponent } from './navigation/navigation.component';
import { Component, HostListener, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
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

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public screen: ScreenSizeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit() {
    const follower = this.document.querySelector(
      '.mouse-follower'
    ) as HTMLElement;
    follower.style.display = 'block';

    if (isPlatformBrowser(this.platformId)) {
      const thresholds = Array.from({ length: 11 }, (_, i) => i / 10);
      const intersectionRatios = new Map<string, number>();

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            intersectionRatios.set(entry.target.id, entry.intersectionRatio);
          });

          let maxRatio = 0;
          let activeSection = this.currentSection;
          intersectionRatios.forEach((ratio, id) => {
            if (ratio > maxRatio) {
              maxRatio = ratio;
              activeSection = id;
            }
          });

          if (maxRatio > 0) {
            this.currentSection = activeSection;
          }
        },
        { threshold: thresholds }
      );

      const aboutSection = this.document.getElementById('ABOUT');
      const experienceSection = this.document.getElementById('EXPERIENCE');
      const projectsSection = this.document.getElementById('PROJECTS');

      if (aboutSection) observer.observe(aboutSection);
      if (experienceSection) observer.observe(experienceSection);
      if (projectsSection) observer.observe(projectsSection);
    }
  }

  currentSection = 'ABOUT';

  navigateToSection(section: string) {
    this.document.getElementById(section)?.scrollIntoView();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const follower = document.querySelector('.mouse-follower') as HTMLElement;
    // Update background style for radial gradient to follow the cursor
    follower.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
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
