import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let mouseFollower: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    mouseFollower = document.createElement('div');
    mouseFollower.classList.add('mouse-follower');
    document.body.appendChild(mouseFollower);
  });

  afterEach(() => {
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

  it('should clean up subscriptions on destroy', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;

    const observerDisconnectSpy = jest.spyOn(app['intersectionObserver'] as any, 'disconnect');

    app.ngOnDestroy();

    expect(observerDisconnectSpy).toHaveBeenCalled();
    expect(app['intersectionObserver']).toBeNull();
  });

  it('should navigate to section', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const dummyElement = document.createElement('div');
    dummyElement.id = 'TEST-SECTION';
    document.body.appendChild(dummyElement);
    const scrollIntoViewSpy = jest.fn();
    dummyElement.scrollIntoView = scrollIntoViewSpy;

    app.navigateToSection('TEST-SECTION');

    expect(scrollIntoViewSpy).toHaveBeenCalled();
    document.body.removeChild(dummyElement);
  });

  it('should handle intersection observer entry update', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    // Trigger an intersection entry change
    if(app['intersectionObserver']) {
      const callback = (app['intersectionObserver'] as any).callback;
      const entries = [
        {
          target: { id: 'PROJECTS' },
          intersectionRatio: 0.8
        },
        {
          target: { id: 'ABOUT' },
          intersectionRatio: 0.1
        }
      ];

      callback(entries, app['intersectionObserver']);
    }

    expect(app.currentSection).toBe('PROJECTS');
  });

  it('should not throw when document object does not exist in mouse move listener', () => {
     const fixture = TestBed.createComponent(AppComponent);
     const app = fixture.componentInstance;
     fixture.detectChanges();

     const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 100, clientY: 100 });
     document.dispatchEvent(mouseMoveEvent);
  });
});
