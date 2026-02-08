import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentCardComponent } from './payment-card.component';
import { PaymentMethod } from '../../interfaces/payment';

describe('PaymentCardComponent', () => {
  let component: PaymentCardComponent;
  let fixture: ComponentFixture<PaymentCardComponent>;

  const mockMethod: PaymentMethod = {
    id: 'cc',
    type: 'credit-card',
    label: 'Credit Card',
    icon: '💳',
    description: 'Pay with Visa, Mastercard, or Amex',
    enabled: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentCardComponent);
    component = fixture.componentInstance;
    component.method = mockMethod;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the payment method label', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.card-label')?.textContent).toContain(
      'Credit Card'
    );
  });

  it('should display the payment method icon', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.card-icon')?.textContent).toContain('💳');
  });

  it('should emit selected event when clicked', () => {
    jest.spyOn(component.selected, 'emit');
    component.onSelect();
    expect(component.selected.emit).toHaveBeenCalledWith('credit-card');
  });

  it('should show indicator when selected', () => {
    component.isSelected = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.card-indicator')).toBeTruthy();
  });

  it('should not show indicator when not selected', () => {
    component.isSelected = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.card-indicator')).toBeNull();
  });
});
