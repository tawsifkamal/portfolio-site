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

  it('should emit section change event when an item is selected', () => {
    const section = 'PROJECTS';
    jest.spyOn(component.sectionChangeEvent, 'emit');

    component.selectItem(section);

    expect(component.selectedItem).toBe(section);
    expect(component.sectionChangeEvent.emit).toHaveBeenCalledWith(section);
  });
});
