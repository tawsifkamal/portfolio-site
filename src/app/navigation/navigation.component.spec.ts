import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationComponent } from './navigation.component';
import { By } from '@angular/platform-browser';

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

  it('should emit sectionChangeEvent when item is selected', () => {
      const emitSpy = jest.spyOn(component.sectionChangeEvent, 'emit');
      component.selectItem('PROJECTS');
      expect(component.selectedItem).toBe('PROJECTS');
      expect(emitSpy).toHaveBeenCalledWith('PROJECTS');
  });
});
