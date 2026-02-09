export interface Payment {
  name: string;
  icon: string;
  description: string;
  supportedCurrencies: string[];
  processingTime: string;
  fee: string;
}
