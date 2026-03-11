import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgZone } from '@angular/core';

describe('AppComponent', () => {
  let mouseFollower: HTMLElement;

  beforeEach(async () => {
    mouseFollower = document.createElement('div');
    mouseFollower.classList.add('mouse-follower');
    document.body.appendChild(mouseFollower);

    // Add dummy section elements for IntersectionObserver to observe
    ['ABOUT', 'EXPERIENCE', 'PROJECTS'].forEach(id => {
      const el = document.createElement('div');
      el.id = id;
      document.body.appendChild(el);
    });

    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  afterEach(() => {
    document.body.removeChild(mouseFollower);
    ['ABOUT', 'EXPERIENCE', 'PROJECTS'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        document.body.removeChild(el);
      }
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'portfolio-website' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('portfolio-website');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Tawsif Kamal');
  });
});
