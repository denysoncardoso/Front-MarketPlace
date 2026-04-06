import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ProductCardData {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  unit: string;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card h-100 shadow-sm">
      <div class="card-body d-flex flex-column p-3">
        <h5 class="card-title text-truncate mb-1">{{ product().name }}</h5>
        <p class="card-text text-muted small mb-2" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">{{ product().description }}</p>
        <div class="mb-2">
          <span class="fs-5 fw-bold text-primary">R$ {{ product().price | number:'1.2-2' }}</span>
          <small class="text-muted">/{{ product().unit }}</small>
        </div>
        <div class="mb-3">
          @if (product().stock > 1000) {
            <span class="badge bg-success-subtle text-success">Em estoque</span>
          } @else if (product().stock > 0) {
            <span class="badge bg-warning-subtle text-warning">Estoque baixo</span>
          } @else {
            <span class="badge bg-danger-subtle text-danger">Sem estoque</span>
          }
        </div>
        <div class="mt-auto d-grid gap-2">
          @if (showDetail()) {
            <button (click)="detail.emit(product())" class="btn btn-outline-primary btn-sm">
              Ver Detalhes
            </button>
          }
          @if (showAddToCart()) {
            <button (click)="addToCart.emit(product())"
              [disabled]="product().stock === 0"
              class="btn btn-primary btn-sm"
              [disabled]="product().stock === 0">
              Adicionar ao Carrinho
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
