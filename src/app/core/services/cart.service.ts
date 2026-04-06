import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { MockDataService } from './mock-data.service';

const API = 'http://localhost:5000/api';

export interface CartItemDto {
  id: string;
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  total: number;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private http = inject(HttpClient);
  private mock = inject(MockDataService);
  cartItems = signal<CartItemDto[]>([]);

  async getCart(): Promise<CartItemDto[]> {
    try {
      const items = await firstValueFrom(this.http.get<CartItemDto[]>(`${API}/cart`));
      this.cartItems.set(items);
      return items;
    } catch {
      const items = this.mock.getCart();
      this.cartItems.set(items);
      return items;
    }
  }

  async addItem(req: AddToCartRequest): Promise<CartItemDto> {
    try {
      return await firstValueFrom(this.http.post<CartItemDto>(`${API}/cart`, req));
    } catch {
      return await this.mock.addToCart(req);
    }
  }

  async updateItem(id: string, quantity: number): Promise<CartItemDto> {
    try {
      return await firstValueFrom(this.http.put<CartItemDto>(`${API}/cart/${id}`, { quantity }));
    } catch {
      return await this.mock.updateCartItem(id, quantity);
    }
  }

  async removeItem(id: string): Promise<void> {
    try {
      await firstValueFrom(this.http.delete(`${API}/cart/${id}`));
    } catch {
      await this.mock.removeCartItem(id);
    }
  }

  async clearCart(): Promise<void> {
    try {
      await firstValueFrom(this.http.delete(`${API}/cart`));
    } catch {
      await this.mock.clearCart();
    }
    this.cartItems.set([]);
  }

  get cartTotal(): number {
    return this.cartItems().reduce((sum, i) => sum + i.total, 0);
  }
}
