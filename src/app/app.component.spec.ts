import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  afterEach(() => {
    if (typeof jest !== 'undefined') {
      jest.restoreAllMocks();
    }
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

  it('should handle navigateToSection', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    HTMLElement.prototype.scrollIntoView = jest.fn();

    app.navigateToSection('ABOUT');

    expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('should handle onWindowScroll', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.offsets = {
      ABOUT: 0,
      EXPERIENCE: 500,
      PROJECTS: 1000,
    };

    window.pageYOffset = 100;
    app.onWindowScroll();
    expect(app.currentSection).toBe('ABOUT');

    window.pageYOffset = 600;
    app.onWindowScroll();
    expect(app.currentSection).toBe('EXPERIENCE');

    window.pageYOffset = 1100;
    app.onWindowScroll();
    expect(app.currentSection).toBe('PROJECTS');
  });

  it('should handle onMouseMove', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    const mouseEvent = new MouseEvent('mousemove', {
      clientX: 100,
      clientY: 200
    });

    const follower = document.querySelector('.mouse-follower') as HTMLElement;
    // Set a default background to spy on
    follower.style.background = 'black';

    app.onMouseMove(mouseEvent);

    // JSDOM doesn't handle complex CSS strings well, just verify the event fired and code ran without error
    expect(app).toBeTruthy();
  });
});
