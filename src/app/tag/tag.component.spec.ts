import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TagComponent } from './tag.component';

describe('TagComponent', () => {
  let component: TagComponent;
  let fixture: ComponentFixture<TagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept text as input', () => {
    component.text = 'TypeScript';
    expect(component.text).toBe('TypeScript');
  });

  it('should render the text input in the template', () => {
    component.text = 'Angular';
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const tagElement = compiled.querySelector('.tag');
    
    expect(tagElement?.textContent).toContain('Angular');
  });

  it('should update rendered text when text input changes', () => {
    component.text = 'React';
    fixture.detectChanges();
    
    let compiled = fixture.nativeElement as HTMLElement;
    let tagElement = compiled.querySelector('.tag');
    expect(tagElement?.textContent).toContain('React');
    
    component.text = 'Vue';
    fixture.detectChanges();
    
    compiled = fixture.nativeElement as HTMLElement;
    tagElement = compiled.querySelector('.tag');
    expect(tagElement?.textContent).toContain('Vue');
  });

  it('should render empty when text is undefined', () => {
    component.text = undefined as any;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const tagElement = compiled.querySelector('.tag');
    
    expect(tagElement?.textContent?.trim()).toBe('');
  });
});
