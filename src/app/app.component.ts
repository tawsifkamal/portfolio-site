import { NavigationComponent } from './navigation/navigation.component';
import { Component, HostListener, AfterViewInit, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { WorkExperienceSectionComponent } from './work-experience-section/work-experience-section.component';
import { TagComponent } from './tag/tag.component';
import { ProjectSectionComponent } from './project-section/project-section.component';
import { Article } from './interfaces/article';
import { ScreenSizeService } from './services/screen-size.service';
import { DataService } from './services/data.service';

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
  articles: Article[];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public screen: ScreenSizeService,
    private dataService: DataService
  ) {
    this.articles = this.dataService.articles;
  }

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

  currentSection = 'ABOUT';

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
      this.currentSection = 'ABOUT';
    } else if (
      scrollPosition > this.offsets['EXPERIENCE'] &&
      scrollPosition < this.offsets['PROJECTS']
    ) {
      this.currentSection = 'EXPERIENCE';
    } else if (scrollPosition > this.offsets['PROJECTS']) {
      this.currentSection = 'PROJECTS';
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const follower = document.querySelector('.mouse-follower') as HTMLElement;
    // Update background style for radial gradient to follow the cursor
    follower.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
  }

  title = 'portfolio-website';
}
