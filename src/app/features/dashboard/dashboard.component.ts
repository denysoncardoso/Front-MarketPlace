import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCardComponent } from '../../shared/components/stat-card.component';
import { AuthService } from '../../core/services/auth.service';
import { OrderService, OrderDto, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../../core/services/order.service';
import { CartService } from '../../core/services/cart.service';

interface StatDef {
  icon: string;
  label: string;
  value: string | number;
  delta?: string;
  deltaType: 'up' | 'down' | 'neutral';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StatCardComponent],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h4 fw-bold mb-0">
        @if (auth.isPharmacy()) { Painel da Farmácia } @else { Painel do Fornecedor }
      </h1>
      <span class="text-muted small">{{ today | date:'fullDate' }}</span>
    </div>

    <!-- Stat Cards -->
    <div class="row g-3 mb-4">
      @for (stat of stats(); track $index) {
        <div class="col-sm-6 col-xl-3">
          <app-stat-card
            [icon]="stat.icon"
            [label]="stat.label"
            [value]="stat.value"
            [delta]="stat.delta"
            [deltaType]="stat.deltaType" />
        </div>
      }
    </div>

    <!-- Recent Activity -->
    <div class="card shadow-sm">
      <div class="card-header bg-transparent py-3">
        <h6 class="fw-bold mb-0">
          @if (auth.isPharmacy()) { Últimos Pedidos } @else { Pedidos Recentes }
        </h6>
      </div>
      @if (loading()) {
        <div class="p-4">
          @for (_ of [1,2,3,4,5]; track $index) {
            <div class="d-flex gap-3 mb-3">
              <span class="placeholder col-2 bg-secondary" style="height:14px"></span>
              <span class="placeholder col-4 bg-secondary" style="height:14px"></span>
              <span class="placeholder col-1 bg-secondary" style="height:14px"></span>
            </div>
          }
        </div>
      } @else if (orders().length === 0) {
        <div class="text-center py-5 text-muted">
          <i class="bi bi-inbox" style="font-size:2rem"></i>
          <div class="mt-2 small">Nenhum pedido registrado.</div>
        </div>
      } @else {
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>Pedido</th>
                <th>Data</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              @for (order of orders(); track order.id) {
                <tr>
                  <td class="fw-semibold">#{{ order.id | slice:0:8 }}</td>
                  <td>{{ order.createdAt | date:'dd/MM/yyyy' }}</td>
                  <td class="fw-bold text-primary">R$ {{ order.totalAmount | number:'1.2-2' }}</td>
                  <td>
                    <span class="badge rounded-pill px-2 py-1"
                          [ngClass]="statusColor(order.status)">
                      {{ statusLabel(order.status) }}
                    </span>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  `
})
export class DashboardComponent implements OnInit {
  auth = inject(AuthService);
  private orderService = inject(OrderService);
  private cartService = inject(CartService);

  orders = signal<OrderDto[]>([]);
  loading = signal(true);

  stats = signal<StatDef[]>([]);

  today = new Date();

  async ngOnInit(): Promise<void> {
    await this.load();
    this.buildStats();
  }

  async load(): Promise<void> {
    this.loading.set(true);
    try {
      const data = await this.orderService.getAll();
      this.orders.set(data);
    } finally {
      this.loading.set(false);
    }
  }

  buildStats(): void {
    const orderList = this.orders();
    const totalOrders = orderList.length;
    const pending = orderList.filter(o => o.status === 0).length;
    const cartItems = this.cartService.cartItems().length;
    const totalValue = orderList.reduce((sum, o) => sum + o.totalAmount, 0);

    if (this.auth.isPharmacy()) {
      this.stats.set([
        { icon: 'bi-receipt', label: 'Total de Pedidos', value: totalOrders, delta: 'este mês', deltaType: 'neutral' },
        { icon: 'bi-hourglass-split', label: 'Pedidos Pendentes', value: pending, deltaType: pending > 0 ? 'down' : 'neutral' },
        { icon: 'bi-cart3', label: 'Itens no Carrinho', value: cartItems, deltaType: 'neutral' },
        { icon: 'bi-cash-stack', label: 'Valor Total', value: `R$ ${totalValue.toFixed(2)}`, deltaType: 'up' },
      ]);
    } else {
      this.stats.set([
        { icon: 'bi-box-seam', label: 'Produtos Ativos', value: '—', deltaType: 'neutral' },
        { icon: 'bi-receipt', label: 'Pedidos Recebidos', value: totalOrders, deltaType: 'up' },
        { icon: 'bi-chat-square-quote', label: 'Cotações a Responder', value: '—', deltaType: 'neutral' },
        { icon: 'bi-cash-stack', label: 'Receita do Mês', value: `R$ ${totalValue.toFixed(2)}`, deltaType: 'up' },
      ]);
    }
  }

  statusLabel(s: number): string {
    return ORDER_STATUS_LABELS[s] ?? 'Desconhecido';
  }

  statusColor(s: number): string {
    return ORDER_STATUS_COLORS[s] ?? 'bg-light text-dark';
  }
}
