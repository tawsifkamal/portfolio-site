import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let mouseFollower: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    mouseFollower = document.createElement('div');
    mouseFollower.className = 'mouse-follower';
    document.body.appendChild(mouseFollower);
  });

  afterEach(() => {
    document.body.removeChild(mouseFollower);
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

  it('should correctly update currentSection through IntersectionObserver callback', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    // Trigger IntersectionObserver callback manually with intersection records
    const callback = (globalThis as any).__intersectionObserverCallback;
    expect(callback).toBeTruthy();

    // Simulate callback with entries where PROJECTS has the highest visibility (intersectionRatio)
    callback([
      { target: { id: 'ABOUT' }, intersectionRatio: 0.1 },
      { target: { id: 'EXPERIENCE' }, intersectionRatio: 0.3 },
      { target: { id: 'PROJECTS' }, intersectionRatio: 0.8 },
    ]);

    expect(app.currentSection).toEqual('PROJECTS');
  });
});
