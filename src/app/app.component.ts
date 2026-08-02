import { NavigationComponent } from './navigation/navigation.component';
import { Component, HostListener, AfterViewInit, Inject, ChangeDetectionStrategy, signal, computed } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  ngAfterViewInit() {
    this.offsets = {
      ABOUT: this.calculateOffset('ABOUT', 70),
      EXPERIENCE: this.calculateOffset('EXPERIENCE', 70),
      PROJECTS: this.calculateOffset('PROJECTS', 70),
    };


    const follower = this.document.querySelector(
      '.mouse-follower'
    ) as HTMLElement;
    follower.style.display = 'block';
  }

  private calculateOffset(sectionId: string, padding: number): number {
    const element = this.document.getElementById(sectionId);
    return element ? element.offsetTop - padding : 0;
  }

  currentSectionSignal = signal<string>('ABOUT');

  // Expose signal value directly as property for template access
  get currentSection() {
    return this.currentSectionSignal();
  }

  navigateToSection(section: string) {
    this.document.getElementById(section)?.scrollIntoView();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // Get current scroll position
    const scrollPosition =
      window.pageYOffset ||
      this.document.documentElement.scrollTop ||
      this.document.body.scrollTop ||
      0;

    if (
      scrollPosition > this.offsets['ABOUT'] &&
      scrollPosition < this.offsets['EXPERIENCE']
    ) {
      this.currentSectionSignal.set('ABOUT');
    } else if (
      scrollPosition > this.offsets['EXPERIENCE'] &&
      scrollPosition < this.offsets['PROJECTS']
    ) {
      this.currentSectionSignal.set('EXPERIENCE');
    } else if (scrollPosition > this.offsets['PROJECTS']) {
      this.currentSectionSignal.set('PROJECTS');
    }
  }

  mouseX = signal(0);
  mouseY = signal(0);
  mouseBackground = computed(() => `radial-gradient(600px at ${this.mouseX()}px ${this.mouseY()}px, rgba(29, 78, 216, 0.15), transparent 80%)`);

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouseX.set(e.clientX);
    this.mouseY.set(e.clientY);
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
