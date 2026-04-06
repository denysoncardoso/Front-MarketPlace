import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

const API = 'http://localhost:5000/api';

export interface QuoteRequestDto {
  id: string;
  pharmacyId: string;
  productName: string;
  quantity: number;
  description: string;
  status: number;
  createdAt: string;
}

export interface QuoteResponseDto {
  id: string;
  quoteRequestId: string;
  supplierId: string;
  supplierName: string;
  unitPrice: number;
  deliveryDays: number;
  notes: string;
  createdAt: string;
}

export interface CreateQuoteRequest {
  productName: string;
  quantity: number;
  description: string;
}

export interface CreateQuoteResponse {
  unitPrice: number;
  deliveryDays: number;
  notes: string;
}

export const QUOTE_STATUS_LABELS: Record<number, string> = {
  0: 'Aberta',
  1: 'Respondida',
  2: 'Aceita',
  3: 'Rejeitada',
  4: 'Expirada'
};

@Injectable({ providedIn: 'root' })
export class QuoteService {
  private http = inject(HttpClient);

  async getQuotes(): Promise<QuoteRequestDto[]> {
    return firstValueFrom(this.http.get<QuoteRequestDto[]>(`${API}/quotes`));
  }

  async create(req: CreateQuoteRequest): Promise<QuoteRequestDto> {
    return firstValueFrom(this.http.post<QuoteRequestDto>(`${API}/quotes`, req));
  }

  async respond(id: string, req: CreateQuoteResponse): Promise<QuoteResponseDto> {
    return firstValueFrom(this.http.post<QuoteResponseDto>(`${API}/quotes/${id}/responses`, req));
  }

  async getResponses(id: string): Promise<QuoteResponseDto[]> {
    return firstValueFrom(this.http.get<QuoteResponseDto[]>(`${API}/quotes/${id}/responses`));
  }
}
