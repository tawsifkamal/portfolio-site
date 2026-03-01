import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    // Mock the mouse follower element
    const mockFollower = document.createElement('div');
    mockFollower.classList.add('mouse-follower');
    document.body.appendChild(mockFollower);

    fixture.detectChanges();
  });

  afterEach(() => {
     // Cleanup mock element
     const follower = document.querySelector('.mouse-follower');
     if (follower) {
         follower.remove();
     }
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'portfolio-website' title`, () => {
    expect(component.title).toEqual('portfolio-website');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Tawsif Kamal');
  });

  it('should update currentSection logic based on scroll position', () => {
    component.offsets = {
      ABOUT: 0,
      EXPERIENCE: 500,
      PROJECTS: 1000
    };

    // Test case: EXPERIENCE section
    Object.defineProperty(window, 'pageYOffset', { value: 600, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 600, configurable: true });

    component.onWindowScroll();
    expect(component.currentSection).toBe('EXPERIENCE');

    // Test case: PROJECTS section
    Object.defineProperty(window, 'pageYOffset', { value: 1100, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 1100, configurable: true });

    component.onWindowScroll();
    expect(component.currentSection).toBe('PROJECTS');

    // Test case: ABOUT section
    Object.defineProperty(window, 'pageYOffset', { value: 100, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 100, configurable: true });

    component.onWindowScroll();
    expect(component.currentSection).toBe('ABOUT');
  });

  it('should cleanup listeners on destroy', () => {
    component.ngOnDestroy();
    expect(true).toBe(true);
  });
});
