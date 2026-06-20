import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentCardComponent } from './payment-card.component';
import { Payment } from '../../interfaces/payment';

describe('PaymentCardComponent', () => {
  let component: PaymentCardComponent;
  let fixture: ComponentFixture<PaymentCardComponent>;

  const mockPayment: Payment = {
    name: 'Credit Card',
    icon: '💳',
    description: 'Pay with credit or debit card',
    supportedCurrencies: ['USD', 'EUR'],
    processingTime: 'Instant',
    fee: '2.9% + $0.30'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentCardComponent);
    component = fixture.componentInstance;
    component.payment = mockPayment;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
