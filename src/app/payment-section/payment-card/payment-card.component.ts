import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentMethod, PaymentMethodType } from '../../interfaces/payment';

@Component({
  selector: 'app-payment-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-card.component.html',
  styleUrl: './payment-card.component.css',
})
export class PaymentCardComponent {
  @Input() method!: PaymentMethod;
  @Input() isSelected: boolean = false;
  @Output() selected = new EventEmitter<PaymentMethodType>();

  onSelect() {
    this.selected.emit(this.method.type);
  }
}
