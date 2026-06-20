import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from '../../tag/tag.component';
import { Payment } from '../../interfaces/payment';
import { ScreenSizeService } from '../../services/screen-size.service';
@Component({
  selector: 'app-payment-card',
  standalone: true,
  imports: [TagComponent, CommonModule],
  templateUrl: './payment-card.component.html',
  styleUrl: './payment-card.component.css',
})
export class PaymentCardComponent {
  constructor(public screen: ScreenSizeService) {}
  @Input() payment!: Payment;
  @Input() hoveredPayment: string | null = null;
}
