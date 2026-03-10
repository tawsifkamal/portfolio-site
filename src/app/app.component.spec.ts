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
    if (mouseFollower && mouseFollower.parentNode) {
      mouseFollower.parentNode.removeChild(mouseFollower);
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


  it('should call scrollIntoView on navigation', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const dummyElement = document.createElement('div');
    dummyElement.id = 'dummy';
    dummyElement.scrollIntoView = jest.fn();
    document.body.appendChild(dummyElement);

    app.navigateToSection('dummy');
    expect(dummyElement.scrollIntoView).toHaveBeenCalled();

    document.body.removeChild(dummyElement);
  });

  it('should trigger ngOnDestroy', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    expect(() => app.ngOnDestroy()).not.toThrow();
  });
});
