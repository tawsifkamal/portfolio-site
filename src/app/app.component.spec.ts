import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

jest.mock('@angular/common', () => {
  const originalModule = jest.requireActual('@angular/common');
  return {
    ...originalModule,
    isPlatformBrowser: () => true,
  };
});

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
    jest.restoreAllMocks();
  });

  it('should unlisten to mousemove on destroy', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    app.ngOnDestroy();
    expect(app['unlistenMouseMove']).toBeDefined();
  });

  it('should navigate to section', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    const mockElement = document.createElement('div');
    mockElement.id = 'ABOUT';
    mockElement.scrollIntoView = jest.fn();

    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);

    app.navigateToSection('ABOUT');
    expect(mockElement.scrollIntoView).toHaveBeenCalled();
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
