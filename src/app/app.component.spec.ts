import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ScreenSizeService } from './services/screen-size.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    // Mock IntersectionObserver
    (window as any).IntersectionObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [ScreenSizeService]
    }).compileComponents();

    // Create mouse-follower element globally as the component queries it via document
    const follower = document.createElement('div');
    follower.classList.add('mouse-follower');
    document.body.appendChild(follower);

    // Create section elements globally
    ['ABOUT', 'EXPERIENCE', 'PROJECTS'].forEach(id => {
        const el = document.createElement('div');
        el.id = id;
        // Mock offsetTop since JSDOM doesn't do layout
        Object.defineProperty(el, 'offsetTop', { value: id === 'ABOUT' ? 0 : id === 'EXPERIENCE' ? 500 : 1000, configurable: true });
        document.body.appendChild(el);
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    // Cleanup global elements
    document.querySelectorAll('.mouse-follower').forEach(e => e.remove());
    ['ABOUT', 'EXPERIENCE', 'PROJECTS'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.remove();
    });
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

  it('should initialize offsets correctly in ngAfterViewInit', () => {
    // ngAfterViewInit is called by fixture.detectChanges() in beforeEach
    // We expect offsets to be calculated based on the mocked elements
    // ABOUT: 0 - 70 = -70
    // EXPERIENCE: 500 - 70 = 430
    // PROJECTS: 1000 - 70 = 930
    expect(component.offsets.ABOUT).toBe(-70);
    expect(component.offsets.EXPERIENCE).toBe(430);
    expect(component.offsets.PROJECTS).toBe(930);
  });

  it('should update currentSection on scroll', () => {
    // Manually set values to be sure
    component.offsets = {
      ABOUT: 0,
      EXPERIENCE: 500,
      PROJECTS: 1000
    };

    // Helper to trigger scroll
    const triggerScroll = (y: number) => {
        // Mock both properties to be safe
        Object.defineProperty(window, 'pageYOffset', { value: y, configurable: true });
        Object.defineProperty(document.documentElement, 'scrollTop', { value: y, configurable: true });
        Object.defineProperty(document.body, 'scrollTop', { value: y, configurable: true });

        window.dispatchEvent(new Event('scroll'));
    };

    // Test ABOUT section
    triggerScroll(100);
    expect(component.currentSection).toBe('ABOUT');

    // Test EXPERIENCE section
    triggerScroll(600);
    expect(component.currentSection).toBe('EXPERIENCE');

    // Test PROJECTS section
    triggerScroll(1100);
    expect(component.currentSection).toBe('PROJECTS');
  });

  it('should update mouse follower on mousemove', () => {
    const mockStyle = { background: '' };
    const mockElement = { style: mockStyle } as any;

    jest.spyOn(document, 'querySelector').mockReturnValue(mockElement);

    const mouseEvent = {
      clientX: 150,
      clientY: 250
    } as MouseEvent;

    // Call the method directly to ensure logic is tested
    component.onMouseMove(mouseEvent);

    expect(document.querySelector).toHaveBeenCalledWith('.mouse-follower');
    expect(mockStyle.background).toContain('radial-gradient');
    expect(mockStyle.background).toContain('150px 250px');
  });

  it('should navigate to section', () => {
      const sectionId = 'ABOUT';
      const element = document.getElementById(sectionId);
      // Mock scrollIntoView
      element!.scrollIntoView = jest.fn();

      component.navigateToSection(sectionId);
      expect(element!.scrollIntoView).toHaveBeenCalled();
  });
});
