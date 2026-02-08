import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentCardComponent } from './payment-card/payment-card.component';
import {
  PaymentMethod,
  PaymentMethodType,
} from '../interfaces/payment';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-payment-section',
  standalone: true,
  imports: [CommonModule, FormsModule, PaymentCardComponent],
  templateUrl: './payment-section.component.html',
  styleUrl: './payment-section.component.css',
})
export class PaymentSectionComponent {
  paymentMethods: PaymentMethod[];
  selectedMethod: PaymentMethodType | null = null;
  amount: number = 0;
  currency: string = 'USD';
  paymentSuccess: boolean = false;
  paymentMessage: string = '';

  constructor(private paymentService: PaymentService) {
    this.paymentMethods = this.paymentService.getAvailablePaymentMethods();
  }

  selectMethod(type: PaymentMethodType) {
    this.selectedMethod = this.selectedMethod === type ? null : type;
    this.paymentSuccess = false;
    this.paymentMessage = '';
  }

  getSelectedMethodLabel(): string {
    const method = this.paymentMethods.find(
      (m) => m.type === this.selectedMethod
    );
    return method ? method.label : '';
  }

  submitPayment() {
    const result = this.paymentService.processPayment({
      amount: this.amount,
      currency: this.currency,
      selectedMethod: this.selectedMethod,
    });

    this.paymentSuccess = result.success;
    this.paymentMessage = result.message;
  }
}
