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

  it('should emit sectionChangeEvent when an item is selected', () => {
    const emitSpy = jest.spyOn(component.sectionChangeEvent, 'emit');
    const selectedItem = 'EXPERIENCE';

    component.selectItem(selectedItem);

    expect(component.selectedItem).toEqual(selectedItem);
    expect(emitSpy).toHaveBeenCalledWith(selectedItem);
  });
});
