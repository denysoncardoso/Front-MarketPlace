import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

const API = 'http://localhost:5000/api';

export interface ProductDto {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  unit: string;
  supplierId: string;
  isActive: boolean;
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
  products = signal<ProductDto[]>([]);

  async getAll(search?: string): Promise<ProductDto[]> {
    const params = search ? `?search=${encodeURIComponent(search)}` : '';
    const data = await firstValueFrom(this.http.get<ProductDto[]>(`${API}/products${params}`));
    this.products.set(data);
    return data;
  }

  async getById(id: string): Promise<ProductDto | undefined> {
    return firstValueFrom(this.http.get<ProductDto>(`${API}/products/${id}`));
  }

  async create(product: CreateProductRequest): Promise<ProductDto> {
    return firstValueFrom(this.http.post<ProductDto>(`${API}/products`, product));
  }

  async update(id: string, product: UpdateProductRequest): Promise<ProductDto> {
    return firstValueFrom(this.http.put<ProductDto>(`${API}/products/${id}`, product));
  }

  async delete(id: string): Promise<void> {
    await firstValueFrom(this.http.delete(`${API}/products/${id}`));
  }
}
