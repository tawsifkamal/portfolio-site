import { TestBed, ComponentFixture } from '@angular/core/testing';
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

  describe('onWindowScroll', () => {
    let fixture: ComponentFixture<AppComponent>;
    let app: AppComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      app = fixture.componentInstance;
      app.offsets = { ABOUT: 0, EXPERIENCE: 500, PROJECTS: 1000 };
    });

    it('should set currentSection to ABOUT when scrolling to the ABOUT section', () => {
      window.pageYOffset = 100;
      app.onWindowScroll();
      expect(app.currentSection).toEqual('ABOUT');
    });

    it('should set currentSection to EXPERIENCE when scrolling to the EXPERIENCE section', () => {
      window.pageYOffset = 600;
      app.onWindowScroll();
      expect(app.currentSection).toEqual('EXPERIENCE');
    });

    it('should set currentSection to PROJECTS when scrolling to the PROJECTS section', () => {
      window.pageYOffset = 1100;
      app.onWindowScroll();
      expect(app.currentSection).toEqual('PROJECTS');
    });
  });
});
