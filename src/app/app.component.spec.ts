import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    // Mock IntersectionObserver
    (window as any).IntersectionObserver = class {
      constructor(callback: any) {}
      observe() {}
      unobserve() {}
      disconnect() {}
    };

    // Mock mouse-follower element
    const mouseFollower = document.createElement('div');
    mouseFollower.classList.add('mouse-follower');
    document.body.appendChild(mouseFollower);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  afterEach(() => {
    // Cleanup mouse-follower
    const mouseFollower = document.querySelector('.mouse-follower');
    if (mouseFollower) {
      document.body.removeChild(mouseFollower);
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
});
