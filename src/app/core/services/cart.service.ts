import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

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
  cartItems = signal<CartItemDto[]>([]);

  async getCart(): Promise<CartItemDto[]> {
    const items = await firstValueFrom(this.http.get<CartItemDto[]>(`${API}/cart`));
    this.cartItems.set(items);
    return items;
  }

  async addItem(req: AddToCartRequest): Promise<CartItemDto> {
    return firstValueFrom(this.http.post<CartItemDto>(`${API}/cart`, req));
  }

  async updateItem(id: string, quantity: number): Promise<CartItemDto> {
    return firstValueFrom(this.http.put<CartItemDto>(`${API}/cart/${id}`, { quantity }));
  }

  async removeItem(id: string): Promise<void> {
    await firstValueFrom(this.http.delete(`${API}/cart/${id}`));
  }

  async clearCart(): Promise<void> {
    await firstValueFrom(this.http.delete(`${API}/cart`));
    this.cartItems.set([]);
  }

  get cartTotal(): number {
    return this.cartItems().reduce((sum, i) => sum + i.total, 0);
  }
}
