import { Injectable } from '@angular/core';
import { PaymentMethod, PaymentFormData } from '../interfaces/payment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  getAvailablePaymentMethods(): PaymentMethod[] {
    return [
      {
        id: 'cc',
        type: 'credit-card',
        label: 'Credit Card',
        icon: '💳',
        description: 'Pay with Visa, Mastercard, or Amex',
        enabled: true,
      },
      {
        id: 'pp',
        type: 'paypal',
        label: 'PayPal',
        icon: '🅿️',
        description: 'Pay with your PayPal account',
        enabled: true,
      },
      {
        id: 'bt',
        type: 'bank-transfer',
        label: 'Bank Transfer',
        icon: '🏦',
        description: 'Direct bank transfer',
        enabled: true,
      },
      {
        id: 'crypto',
        type: 'crypto',
        label: 'Cryptocurrency',
        icon: '₿',
        description: 'Pay with Bitcoin, Ethereum, or Solana',
        enabled: true,
      },
    ];
  }

  processPayment(formData: PaymentFormData): {
    success: boolean;
    message: string;
    transactionId?: string;
  } {
    const validation = this.validatePayment(formData);
    if (!validation.valid) {
      return {
        success: false,
        message: `Payment failed: ${validation.errors.join(', ')}`,
      };
    }

    const transactionId = this.generateTransactionId();
    return {
      success: true,
      message: `Payment of ${formData.amount} ${formData.currency} processed successfully via ${formData.selectedMethod}`,
      transactionId,
    };
  }

  validatePayment(formData: PaymentFormData): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!formData.amount || formData.amount <= 0) {
      errors.push('Amount must be greater than 0');
    }

    if (!formData.currency) {
      errors.push('Currency is required');
    }

    if (!formData.selectedMethod) {
      errors.push('Payment method is required');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  private generateTransactionId(): string {
    return 'txn_' + Math.random().toString(36).substring(2, 15);
  }
}
