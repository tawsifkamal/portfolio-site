import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

jest.mock('@angular/common', () => {
  const originalModule = jest.requireActual('@angular/common');
  return {
    __esModule: true,
    ...originalModule,
    isPlatformBrowser: jest.fn().mockReturnValue(true),
  };
});

describe('AppComponent', () => {
  let followerElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    followerElement = document.createElement('div');
    followerElement.classList.add('mouse-follower');
    document.body.appendChild(followerElement);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    if (followerElement && followerElement.parentNode) {
      followerElement.parentNode.removeChild(followerElement);
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
