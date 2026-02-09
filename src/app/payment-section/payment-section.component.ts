import { Component } from '@angular/core';
import { PaymentCardComponent } from './payment-card/payment-card.component';
import { Payment } from '../interfaces/payment';
import { CommonModule } from '@angular/common';
import { ScreenSizeService } from '../services/screen-size.service';

@Component({
  selector: 'app-payment-section',
  standalone: true,
  imports: [PaymentCardComponent, CommonModule],
  templateUrl: './payment-section.component.html',
  styleUrl: './payment-section.component.css',
})
export class PaymentSectionComponent {
  constructor(public screen: ScreenSizeService) {}

  hoveredPayment: string | null = null;
  payments: Payment[] = [
    {
      name: 'Credit Card',
      icon: '💳',
      description: 'Pay securely with credit or debit card',
      supportedCurrencies: ['USD', 'EUR', 'GBP'],
      processingTime: 'Instant',
      fee: '2.9% + $0.30',
    },
    {
      name: 'PayPal',
      icon: '🅿️',
      description: 'Fast and secure online payments',
      supportedCurrencies: ['USD', 'EUR', 'GBP', 'AUD'],
      processingTime: 'Instant',
      fee: '3.49% + $0.49',
    },
    {
      name: 'Bitcoin',
      icon: '₿',
      description: 'Decentralized cryptocurrency payments',
      supportedCurrencies: ['BTC', 'ETH'],
      processingTime: '10-60 minutes',
      fee: 'Network fee',
    },
    {
      name: 'Bank Transfer',
      icon: '🏦',
      description: 'Direct bank-to-bank transfer',
      supportedCurrencies: ['USD', 'EUR'],
      processingTime: '1-3 business days',
      fee: 'Free',
    },
  ];
}
