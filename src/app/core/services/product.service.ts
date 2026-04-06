import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { MockDataService } from './mock-data.service';

const API = 'http://localhost:5000/api';

export interface ProductDto {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  unit: string;
  supplierId?: string;
  supplierName?: string;
  isActive?: boolean;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  stock: number;
  unit: string;
}

export interface UpdateProductRequest {
  name: string;
  description: string;
  price: number;
  stock: number;
  unit: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private mock = inject(MockDataService);
  products = signal<ProductDto[]>([]);

  async getAll(search?: string): Promise<ProductDto[]> {
    try {
      const params = search ? `?search=${encodeURIComponent(search)}` : '';
      const data = await firstValueFrom(this.http.get<any[]>(`${API}/products${params}`));
      this.products.set(data);
      return data;
    } catch {
      const data = this.mock.getProducts(search);
      this.products.set(data);
      return data;
    }
  }

  async getById(id: string): Promise<ProductDto | undefined> {
    try {
      return await firstValueFrom(this.http.get<ProductDto>(`${API}/products/${id}`));
    } catch {
      return this.mock.getProducts().find(p => p.id === id);
    }
  }

  async create(product: CreateProductRequest): Promise<ProductDto> {
    try {
      return await firstValueFrom(this.http.post<ProductDto>(`${API}/products`, product));
    } catch {
      return await this.mock.createProduct(product);
    }
  }

  async update(id: string, product: UpdateProductRequest): Promise<ProductDto> {
    try {
      return await firstValueFrom(this.http.put<ProductDto>(`${API}/products/${id}`, product));
    } catch {
      return await this.mock.updateProduct(id, product);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await firstValueFrom(this.http.delete(`${API}/products/${id}`));
    } catch {
      await this.mock.deleteProduct(id);
    }
  }
}
