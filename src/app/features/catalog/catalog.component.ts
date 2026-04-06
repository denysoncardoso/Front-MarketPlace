import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../shared/components/page-header.component';
import { ProductCardComponent, ProductCardData } from '../../shared/components/product-card.component';
import { ProductService, ProductDto } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, ProductCardComponent],
  templateUrl: './catalog.component.html'
})
export class CatalogComponent implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  products = signal<ProductCardData[]>([]);
  search = signal<string>('');
  loading = signal<boolean>(false);
  addedProductId = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    await this.loadProducts();
  }

  async loadProducts(): Promise<void> {
    this.loading.set(true);
    try {
      const data = await this.productService.getAll(this.search());
      this.products.set(data.map(p => this.toCard(p)));
    } finally {
      this.loading.set(false);
    }
  }

  async onSearch(): Promise<void> {
    await this.loadProducts();
  }

  async onAddToCart(product: ProductCardData): Promise<void> {
    this.addedProductId.set(product.id);
    await this.cartService.addItem({ productId: product.id, quantity: 1 });
    setTimeout(() => this.addedProductId.set(null), 1500);
  }

  private toCard(p: ProductDto): ProductCardData {
    return { id: p.id, name: p.name, description: p.description, price: p.price, stock: p.stock, unit: p.unit };
  }
}