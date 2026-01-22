import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default selectedItem as "ABOUT"', () => {
    expect(component.selectedItem).toBe('ABOUT');
  });

  it('should update selectedItem when selectItem is called', () => {
    component.selectItem('EXPERIENCE');
    expect(component.selectedItem).toBe('EXPERIENCE');

    component.selectItem('PROJECTS');
    expect(component.selectedItem).toBe('PROJECTS');
  });

  it('should emit sectionChangeEvent when selectItem is called', () => {
    spyOn(component.sectionChangeEvent, 'emit');

    component.selectItem('EXPERIENCE');

    expect(component.sectionChangeEvent.emit).toHaveBeenCalledWith('EXPERIENCE');
  });

  it('should emit the correct section when selectItem is called multiple times', () => {
    spyOn(component.sectionChangeEvent, 'emit');

    component.selectItem('ABOUT');
    expect(component.sectionChangeEvent.emit).toHaveBeenCalledWith('ABOUT');

    component.selectItem('PROJECTS');
    expect(component.sectionChangeEvent.emit).toHaveBeenCalledWith('PROJECTS');

    expect(component.sectionChangeEvent.emit).toHaveBeenCalledTimes(2);
  });

  it('should accept selectedItem as input', () => {
    component.selectedItem = 'PROJECTS';
    fixture.detectChanges();
    
    expect(component.selectedItem).toBe('PROJECTS');
  });
});
