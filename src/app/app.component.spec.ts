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

  it('should navigate to section by scrolling it into view', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    // Create a mock element
    const mockElement = document.createElement('div');
    mockElement.scrollIntoView = jest.fn();

    // Mock getElementById to return our mock element
    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);

    app.navigateToSection('ABOUT');

    expect(document.getElementById).toHaveBeenCalledWith('ABOUT');
    expect(mockElement.scrollIntoView).toHaveBeenCalled();
  });

  it('should update currentSection on window scroll', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.offsets = {
      ABOUT: 100,
      EXPERIENCE: 500,
      PROJECTS: 1000,
    };

    // Test scroll in ABOUT section
    Object.defineProperty(window, 'pageYOffset', { value: 200, writable: true });
    app.onWindowScroll();
    expect(app.currentSection).toEqual('ABOUT');

    // Test scroll in EXPERIENCE section
    Object.defineProperty(window, 'pageYOffset', { value: 600, writable: true });
    app.onWindowScroll();
    expect(app.currentSection).toEqual('EXPERIENCE');

    // Test scroll in PROJECTS section
    Object.defineProperty(window, 'pageYOffset', { value: 1100, writable: true });
    app.onWindowScroll();
    expect(app.currentSection).toEqual('PROJECTS');
  });

  it('should update mouseFollower style on mouse move', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // This will trigger ngAfterViewInit and setup mouseFollower view child
    const app = fixture.componentInstance;

    expect(app.mouseFollower).toBeDefined();

    const mouseEvent = new MouseEvent('mousemove', {
      clientX: 100,
      clientY: 200
    });

    app.onMouseMove(mouseEvent);

    // JSDOM does not support complex CSS strings like `radial-gradient` well.
    // To ensure our function logic works, we'll spy on the style.setProperty or just mock style object to avoid JSDOM drop.
    // However, native element style can't be easily mocked without breaking other stuff.
    // Let's directly mock the nativeElement.style object for this test before calling onMouseMove
    const styleMock = { background: '' };
    Object.defineProperty(app.mouseFollower.nativeElement, 'style', {
      value: styleMock,
      writable: true
    });

    app.onMouseMove(mouseEvent);

    expect(styleMock.background).toContain('radial-gradient(600px at 100px 200px');
  });
});
