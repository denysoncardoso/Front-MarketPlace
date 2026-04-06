import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../shared/components/page-header.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge.component';
import { OrderService, OrderDto, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../../core/services/order.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {
  private orderService = inject(OrderService);
  private auth = inject(AuthService);
  orders = signal<OrderDto[]>([]);
  loading = signal(true);
  expandedOrder = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    await this.load();
  }

  async load(): Promise<void> {
    this.loading.set(true);
    try {
      this.orders.set(await this.orderService.getAll());
    } finally {
      this.loading.set(false);
    }
  }

  toggleExpand(id: string): void {
    this.expandedOrder.set(this.expandedOrder() === id ? null : id);
  }

  label(status: number): string {
    return ORDER_STATUS_LABELS[status] ?? 'Unknown';
  }

  color(status: number): string {
    return ORDER_STATUS_COLORS[status] ?? 'bg-secondary-subtle text-secondary';
  }

  isSupplier(): boolean {
    return this.auth.isSupplier();
  }
}
