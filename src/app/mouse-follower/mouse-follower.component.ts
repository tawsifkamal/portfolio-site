import { Component, HostListener, AfterViewInit, Inject, ElementRef } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-mouse-follower',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="mouse-follower" #follower></div>`,
  styleUrls: ['./mouse-follower.component.css'],
})
export class MouseFollowerComponent implements AfterViewInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private el: ElementRef
  ) {}

  ngAfterViewInit() {
    const follower = this.el.nativeElement.querySelector(
      '.mouse-follower'
    ) as HTMLElement;
    follower.style.display = 'block';
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const follower = this.el.nativeElement.querySelector(
      '.mouse-follower'
    ) as HTMLElement;
    follower.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
  }
}
