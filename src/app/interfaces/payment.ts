export type PaymentMethodType = 'credit-card' | 'paypal' | 'bank-transfer' | 'crypto';

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  label: string;
  icon: string;
  description: string;
  enabled: boolean;
}

export interface CreditCardPayment extends PaymentMethod {
  type: 'credit-card';
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  cardBrand: 'visa' | 'mastercard' | 'amex' | 'discover';
}

export interface PayPalPayment extends PaymentMethod {
  type: 'paypal';
  email: string;
}

export interface BankTransferPayment extends PaymentMethod {
  type: 'bank-transfer';
  bankName: string;
  accountNumber: string;
  routingNumber: string;
}

export interface CryptoPayment extends PaymentMethod {
  type: 'crypto';
  walletAddress: string;
  network: 'bitcoin' | 'ethereum' | 'solana';
}

export interface PaymentFormData {
  amount: number;
  currency: string;
  selectedMethod: PaymentMethodType | null;
}
