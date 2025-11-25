import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
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
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, portfolio-website');
  });

  it('should update currentSection on window scroll', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.offsets = {
      ABOUT: 0,
      EXPERIENCE: 500,
      PROJECTS: 1000,
    };

    // Scoll to 'EXPERIENCE' section
    Object.defineProperty(window, 'pageYOffset', { value: 600 });
    app.onWindowScroll();
    expect(app.currentSection).toEqual('EXPERIENCE');

    // Scoll to 'PROJECTS' section
    Object.defineProperty(window, 'pageYOffset', { value: 1100 });
    app.onWindowScroll();
    expect(app.currentSection).toEqual('PROJECTS');
  });
});
