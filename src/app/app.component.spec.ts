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

  it('should update currentSection based on IntersectionObserver', () => {
    if (typeof jest === 'undefined') return;
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger ngAfterViewInit

    expect(component.currentSection).toBe('ABOUT');

    // Simulate the IntersectionObserver callback
    const callback = (globalThis as any).__intersectionObserverCallback;
    expect(callback).toBeDefined();

    const mockEntries = [
      { target: { id: 'ABOUT' }, intersectionRatio: 0.1 },
      { target: { id: 'EXPERIENCE' }, intersectionRatio: 0.8 },
      { target: { id: 'PROJECTS' }, intersectionRatio: 0.0 }
    ];

    callback(mockEntries);

    expect(component.currentSection).toBe('EXPERIENCE');

    // Test disconnect on destroy
    expect((component as any).intersectionObserver).toBeDefined();
    component.ngOnDestroy();
    expect((component as any).intersectionObserver.disconnect).toHaveBeenCalled();
  });

  it('should navigate to section by scrolling', () => {
    if (typeof jest === 'undefined') return;
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const mockElement = document.createElement('div');
    mockElement.id = 'EXPERIENCE';
    mockElement.scrollIntoView = jest.fn();
    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);

    component.navigateToSection('EXPERIENCE');
    expect(mockElement.scrollIntoView).toHaveBeenCalled();
  });
});
