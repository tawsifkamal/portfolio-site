import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentSectionComponent } from './payment-section.component';

describe('PaymentSectionComponent', () => {
  let component: PaymentSectionComponent;
  let fixture: ComponentFixture<PaymentSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 4 payment methods', () => {
    expect(component.paymentMethods.length).toBe(4);
  });

  it('should have no selected method initially', () => {
    expect(component.selectedMethod).toBeNull();
  });

  it('should select a method when selectMethod is called', () => {
    component.selectMethod('credit-card');
    expect(component.selectedMethod).toBe('credit-card');
  });

  it('should deselect a method when same method is selected again', () => {
    component.selectMethod('paypal');
    expect(component.selectedMethod).toBe('paypal');
    component.selectMethod('paypal');
    expect(component.selectedMethod).toBeNull();
  });

  it('should switch to a different method when another is selected', () => {
    component.selectMethod('credit-card');
    component.selectMethod('crypto');
    expect(component.selectedMethod).toBe('crypto');
  });

  it('should set success message on valid payment submission', () => {
    component.selectMethod('credit-card');
    component.amount = 50;
    component.currency = 'USD';
    component.submitPayment();
    expect(component.paymentSuccess).toBe(true);
    expect(component.paymentMessage).toContain('50');
    expect(component.paymentMessage).toContain('USD');
  });

  it('should set error message on invalid payment submission', () => {
    component.selectMethod('credit-card');
    component.amount = 0;
    component.currency = 'USD';
    component.submitPayment();
    expect(component.paymentSuccess).toBe(false);
    expect(component.paymentMessage).toBeTruthy();
  });

  it('should reset payment message on method change', () => {
    component.selectMethod('credit-card');
    component.amount = 50;
    component.currency = 'USD';
    component.submitPayment();
    expect(component.paymentMessage).toBeTruthy();

    component.selectMethod('paypal');
    expect(component.paymentMessage).toBe('');
  });

  it('should return the correct selected method label', () => {
    component.selectMethod('bank-transfer');
    expect(component.getSelectedMethodLabel()).toBe('Bank Transfer');
  });
});
