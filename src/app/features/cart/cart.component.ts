import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService, CartItemDto } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private router = inject(Router);
  items = signal<CartItemDto[]>([]);
  loading = signal(true);
  checkingOut = signal(false);

  async ngOnInit(): Promise<void> {
    await this.load();
  }

  async load(): Promise<void> {
    this.loading.set(true);
    try {
      this.items.set(await this.cartService.getCart());
    } finally {
      this.loading.set(false);
    }
  }

  async updateQty(item: CartItemDto, delta: number): Promise<void> {
    const newQty = item.quantity + delta;
    if (newQty < 1) return;
    await this.cartService.updateItem(item.id, newQty);
    await this.load();
  }

  async remove(id: string): Promise<void> {
    await this.cartService.removeItem(id);
    await this.load();
  }

  async checkout(): Promise<void> {
    this.checkingOut.set(true);
    try {
      await this.orderService.create();
      await this.load();
      this.router.navigate(['/my-orders']);
    } catch { } finally {
      this.checkingOut.set(false);
    }
  }

  get total(): number {
    return this.items().reduce((s, i) => s + i.total, 0);
  }
}
