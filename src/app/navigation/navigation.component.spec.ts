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

  it('should emit sectionChangeEvent and set selectedItem on selectItem', () => {
    const emitSpy = jest.spyOn(component.sectionChangeEvent, 'emit');
    component.selectItem('EXPERIENCE');
    expect(component.selectedItem).toBe('EXPERIENCE');
    expect(emitSpy).toHaveBeenCalledWith('EXPERIENCE');
  });
});
