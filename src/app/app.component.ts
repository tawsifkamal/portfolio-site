import { Component, HostListener, AfterViewInit, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LeftSectionComponent } from './left-section/left-section.component';
import { RightSectionComponent } from './right-section/right-section.component';
import { MouseFollowerComponent } from './mouse-follower/mouse-follower.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LeftSectionComponent,
    RightSectionComponent,
    MouseFollowerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  offsets = {
    ABOUT: 0,
    EXPERIENCE: 0,
    PROJECTS: 0,
  };

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngAfterViewInit() {
    this.offsets = {
      ABOUT: this.calculateOffset('ABOUT', 70),
      EXPERIENCE: this.calculateOffset('EXPERIENCE', 70),
      PROJECTS: this.calculateOffset('PROJECTS', 70),
    };
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

  title = 'portfolio-website';
}
