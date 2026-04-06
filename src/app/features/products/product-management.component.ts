import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PageHeaderComponent } from '../../shared/components/page-header.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge.component';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal.component';
import {
  ProductService,
  ProductDto,
  CreateProductRequest,
  UpdateProductRequest
} from '../../core/services/product.service';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PageHeaderComponent],
  templateUrl: './product-management.component.html'
})
export class ProductManagementComponent implements OnInit {
  private productService = inject(ProductService);
  private fb = inject(FormBuilder);
  products = signal<ProductDto[]>([]);
  loading = signal(true);
  showForm = signal(false);
  editingId = signal<string | null>(null);
  error = signal('');
  saving = signal(false);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(200)]],
    description: ['', [Validators.required, Validators.maxLength(1000)]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    unit: ['', [Validators.required, Validators.maxLength(20)]]
  });

  async ngOnInit(): Promise<void> {
    await this.load();
  }

  async load(): Promise<void> {
    this.loading.set(true);
    try {
      this.products.set(await this.productService.getAll());
    } finally {
      this.loading.set(false);
    }
  }

  openCreate(): void {
    this.editingId.set(null);
    this.form.reset({ name: '', description: '', price: 0, stock: 0, unit: '' });
    this.showForm.set(true);
  }

  openEdit(product: ProductDto): void {
    this.editingId.set(product.id);
    this.form.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      unit: product.unit
    });
    this.showForm.set(true);
  }

  closeModal(): void {
    this.showForm.set(false);
  }

  async onSave(): Promise<void> {
    if (this.form.invalid || this.saving()) return;
    this.saving.set(true);
    this.error.set('');
    try {
      const val = this.form.getRawValue();
      const dto = { name: val.name!, description: val.description!, price: Number(val.price), stock: Number(val.stock), unit: val.unit! };
      const id = this.editingId();
      if (id) {
        await this.productService.update(id, dto);
      } else {
        await this.productService.create(dto);
      }
      this.showForm.set(false);
      await this.load();
    } catch (err: unknown) {
      const anyErr = err as { error?: { message?: string } };
      this.error.set(anyErr?.error?.message || 'Erro ao salvar produto.');
    } finally {
      this.saving.set(false);
    }
  }

  onDelete(id: string): void {
    if (confirm('Desativar este produto?')) {
      this.productService.delete(id).then(() => this.load());
    }
  }
}
