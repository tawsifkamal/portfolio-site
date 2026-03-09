import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    // Create elements needed by Renderer2/DOM manipulations
    const follower = document.createElement('div');
    follower.classList.add('mouse-follower');
    document.body.appendChild(follower);

    const about = document.createElement('div');
    about.id = 'ABOUT';
    document.body.appendChild(about);

    const experience = document.createElement('div');
    experience.id = 'EXPERIENCE';
    document.body.appendChild(experience);

    const projects = document.createElement('div');
    projects.id = 'PROJECTS';
    document.body.appendChild(projects);
  });

  afterEach(() => {
    // Clean up DOM elements
    document.body.innerHTML = '';
    jest.restoreAllMocks();
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
