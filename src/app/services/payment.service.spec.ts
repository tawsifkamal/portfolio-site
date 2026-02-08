import { TestBed } from '@angular/core/testing';
import { PaymentService } from './payment.service';
import { PaymentFormData } from '../interfaces/payment';

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAvailablePaymentMethods', () => {
    it('should return 4 payment methods', () => {
      const methods = service.getAvailablePaymentMethods();
      expect(methods.length).toBe(4);
    });

    it('should return methods with all required fields', () => {
      const methods = service.getAvailablePaymentMethods();
      methods.forEach((method) => {
        expect(method.id).toBeTruthy();
        expect(method.type).toBeTruthy();
        expect(method.label).toBeTruthy();
        expect(method.icon).toBeTruthy();
        expect(method.description).toBeTruthy();
        expect(method.enabled).toBe(true);
      });
    });

    it('should include credit-card, paypal, bank-transfer, and crypto types', () => {
      const methods = service.getAvailablePaymentMethods();
      const types = methods.map((m) => m.type);
      expect(types).toContain('credit-card');
      expect(types).toContain('paypal');
      expect(types).toContain('bank-transfer');
      expect(types).toContain('crypto');
    });
  });

  describe('processPayment', () => {
    it('should return success with transactionId for valid payment', () => {
      const formData: PaymentFormData = {
        amount: 100,
        currency: 'USD',
        selectedMethod: 'credit-card',
      };
      const result = service.processPayment(formData);
      expect(result.success).toBe(true);
      expect(result.transactionId).toBeTruthy();
      expect(result.transactionId!.startsWith('txn_')).toBe(true);
      expect(result.message).toContain('100');
      expect(result.message).toContain('USD');
    });

    it('should return failure for invalid payment', () => {
      const formData: PaymentFormData = {
        amount: 0,
        currency: '',
        selectedMethod: null,
      };
      const result = service.processPayment(formData);
      expect(result.success).toBe(false);
      expect(result.transactionId).toBeUndefined();
    });
  });

  describe('validatePayment', () => {
    it('should accept valid payment data', () => {
      const formData: PaymentFormData = {
        amount: 50,
        currency: 'EUR',
        selectedMethod: 'paypal',
      };
      const result = service.validatePayment(formData);
      expect(result.valid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    it('should reject payment with zero amount', () => {
      const formData: PaymentFormData = {
        amount: 0,
        currency: 'USD',
        selectedMethod: 'credit-card',
      };
      const result = service.validatePayment(formData);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Amount must be greater than 0');
    });

    it('should reject payment with negative amount', () => {
      const formData: PaymentFormData = {
        amount: -10,
        currency: 'USD',
        selectedMethod: 'credit-card',
      };
      const result = service.validatePayment(formData);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Amount must be greater than 0');
    });

    it('should reject payment without currency', () => {
      const formData: PaymentFormData = {
        amount: 100,
        currency: '',
        selectedMethod: 'credit-card',
      };
      const result = service.validatePayment(formData);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Currency is required');
    });

    it('should reject payment without selected method', () => {
      const formData: PaymentFormData = {
        amount: 100,
        currency: 'USD',
        selectedMethod: null,
      };
      const result = service.validatePayment(formData);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Payment method is required');
    });

    it('should return multiple errors for completely invalid data', () => {
      const formData: PaymentFormData = {
        amount: 0,
        currency: '',
        selectedMethod: null,
      };
      const result = service.validatePayment(formData);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(3);
    });
  });
});
