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
    expect(compiled.querySelector('h1')?.textContent).toContain('Tawsif Kamal');
  });

  describe('onWindowScroll', () => {
    it('should set currentSection to ABOUT when scrolling in the about section', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.offsets = { ABOUT: 100, EXPERIENCE: 500, PROJECTS: 1000 };

      // Mock scroll position
      Object.defineProperty(window, 'pageYOffset', { value: 200, writable: true });

      app.onWindowScroll();
      expect(app.currentSection).toEqual('ABOUT');
    });

    it('should set currentSection to EXPERIENCE when scrolling in the experience section', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.offsets = { ABOUT: 100, EXPERIENCE: 500, PROJECTS: 1000 };

      Object.defineProperty(window, 'pageYOffset', { value: 600, writable: true });

      app.onWindowScroll();
      expect(app.currentSection).toEqual('EXPERIENCE');
    });

    it('should set currentSection to PROJECTS when scrolling in the projects section', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.offsets = { ABOUT: 100, EXPERIENCE: 500, PROJECTS: 1000 };

      Object.defineProperty(window, 'pageYOffset', { value: 1100, writable: true });

      app.onWindowScroll();
      expect(app.currentSection).toEqual('PROJECTS');
    });
  });
});
