import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { MockDataService } from './mock-data.service';

const API = 'http://localhost:5000/api';

export interface OrderDto {
  id: string;
  buyerId: string;
  status: number;
  totalAmount: number;
  createdAt: string;
  items: OrderItemDto[];
}

export interface OrderItemDto {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface UpdateOrderStatusRequest {
  status: number;
}

export const ORDER_STATUS_LABELS: Record<number, string> = {
  0: 'Pendente',
  1: 'Em Processamento',
  2: 'Enviado',
  3: 'Entregue',
  4: 'Cancelado'
};

export const ORDER_STATUS_COLORS: Record<number, string> = {
  0: 'bg-warning-subtle text-warning',
  1: 'bg-primary-subtle text-primary',
  2: 'bg-info-subtle text-info',
  3: 'bg-success-subtle text-success',
  4: 'bg-danger-subtle text-danger'
};

@Injectable({ providedIn: 'root' })
export class OrderService {
  private http = inject(HttpClient);
  private mock = inject(MockDataService);
  orders = signal<OrderDto[]>([]);

  async create(): Promise<OrderDto> {
    try {
      return await firstValueFrom(this.http.post<OrderDto>(`${API}/orders`, {}));
    } catch {
      return await this.mock.createOrder();
    }
  }

  async getAll(): Promise<OrderDto[]> {
    try {
      const data = await firstValueFrom(this.http.get<OrderDto[]>(`${API}/orders`));
      this.orders.set(data);
      return data;
    } catch {
      const data = this.mock.getOrders();
      this.orders.set(data);
      return data;
    }
  }

  async getById(id: string): Promise<OrderDto | undefined> {
    try {
      return await firstValueFrom(this.http.get<OrderDto>(`${API}/orders/${id}`));
    } catch {
      return this.mock.getOrders().find(o => o.id === id);
    }
  }

  async updateStatus(id: string, status: number): Promise<OrderDto> {
    try {
      return await firstValueFrom(this.http.patch<OrderDto>(`${API}/orders/${id}/status`, { status }));
    } catch {
      throw new Error('Função não disponível no modo demonstração');
    }
  }
}
