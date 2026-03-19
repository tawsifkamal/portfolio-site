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
    if (mouseFollower) {
      document.body.removeChild(mouseFollower);
    }
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

  it('should setup intersection observer if in browser', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    const observeSpy = jest.spyOn(IntersectionObserver.prototype, 'observe');
    fixture.detectChanges();
    expect(observeSpy).toHaveBeenCalled();
  });

  it('should calculate offset correctly', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    const mockElement = document.createElement('div');
    Object.defineProperty(mockElement, 'offsetTop', { value: 100 });
    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);

    expect(component['calculateOffset']('ABOUT', 70)).toEqual(30);
  });

  it('should navigate to section', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    const mockElement = document.createElement('div');
    mockElement.scrollIntoView = jest.fn();
    const scrollSpy = jest.spyOn(mockElement, 'scrollIntoView');
    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);

    component.navigateToSection('ABOUT');
    expect(scrollSpy).toHaveBeenCalled();
  });

  it('should handle intersection observer callbacks correctly', () => {
    let intersectionCallback: IntersectionObserverCallback | null = null;
    jest.spyOn(globalThis, 'IntersectionObserver').mockImplementation((cb) => {
      intersectionCallback = cb;
      return {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
        takeRecords: () => []
      } as unknown as IntersectionObserver;
    });

    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges(); // calls ngAfterViewInit, triggering setupIntersectionObserver

    expect(intersectionCallback).toBeTruthy();

    if (intersectionCallback) {
       const mockEntries: any[] = [
        { target: { id: 'EXPERIENCE' }, intersectionRatio: 0.8 },
        { target: { id: 'ABOUT' }, intersectionRatio: 0.2 },
      ];

      (intersectionCallback as IntersectionObserverCallback)(mockEntries, {} as IntersectionObserver);

      expect(component.currentSection).toEqual('EXPERIENCE');
    }
  });

});
