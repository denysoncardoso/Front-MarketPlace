import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ProductCardData {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  unit: string;
  supplierName?: string;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card h-100">
      <div class="card-body d-flex flex-column p-3">
        <div class="bg-light rounded d-flex align-items-center justify-content-center mb-3" style="height:120px">
          <i class="bi bi-box-seam text-secondary" style="font-size:2.5rem"></i>
        </div>
        <h5 class="card-title text-truncate mb-1 fw-semibold" style="font-size:0.95rem">{{ product().name }}</h5>
        <p class="card-text text-muted small mb-2" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;font-size:0.82rem">{{ product().description }}</p>
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="fs-5 fw-bold text-primary">R$ {{ product().price | number:'1.2-2' }}</span>
          <small class="text-muted">/{{ product().unit }}</small>
        </div>
        <div class="mb-3">
          @if (product().stock > 1000) {
            <span class="badge bg-success-subtle text-success">Em estoque</span>
          } @else if (product().stock > 0) {
            <span class="badge bg-warning-subtle text-warning">Estoque baixo ({{ product().stock }})</span>
          } @else {
            <span class="badge bg-danger-subtle text-danger">Sem estoque</span>
          }
        </div>
        <div class="mt-auto d-grid">
          @if (showAddToCart()) {
            <button (click)="addToCart.emit(product())"
              [disabled]="product().stock === 0"
              class="btn btn-primary btn-sm">
              <i class="bi bi-cart-plus me-1"></i>Adicionar ao Carrinho
            </button>
          }
          @if (showAddToCart() && showDetail()) {
            <div class="mt-1"></div>
          }
          @if (showDetail()) {
            <button (click)="detail.emit(product())" class="btn btn-outline-primary btn-sm">
              Ver Detalhes
            </button>
          }
        </div>
      </div>
    </div>
  `
})
export class ProductCardComponent {
  product = input.required<ProductCardData>();
  showAddToCart = input<boolean>(true);
  showDetail = input<boolean>(false);

  addToCart = output<ProductCardData>();
  detail = output<ProductCardData>();
}