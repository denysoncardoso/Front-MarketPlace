import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ProductService, ProductDto } from '../../core/services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (product(); as p) {
      <div class="card shadow-sm">
        <div class="card-body p-4">
          <h1 class="card-title fw-bold">{{ p.name }}</h1>
          <p class="text-muted mb-3">{{ p.description }}</p>
          <p class="fs-3 fw-bold text-primary">R$ {{ p.price | number:'1.2-2' }} <small class="fs-6 text-muted">/{{ p.unit }}</small></p>
          <p class="text-muted">Estoque: {{ p.stock }}</p>
          <button (click)="addToCart()" [disabled]="p.stock === 0"
            class="btn btn-primary btn-lg mt-2">
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    } @else {
      <p class="text-center text-muted py-5">Produto não encontrado.</p>
    }
  `
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  product = signal<ProductDto | null>(null);

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.product.set(await this.productService.getById(id) ?? null);
    }
  }

  async addToCart(): Promise<void> {
    const p = this.product();
    if (p) await this.cartService.addItem({ productId: p.id, quantity: 1 });
  }
}
