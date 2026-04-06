import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { MockDataService } from './mock-data.service';

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
  private mock = inject(MockDataService);

  async getQuotes(): Promise<QuoteRequestDto[]> {
    try {
      return await firstValueFrom(this.http.get<QuoteRequestDto[]>(`${API}/quotes`));
    } catch {
      return this.mock.getQuotes();
    }
  }

  async create(req: CreateQuoteRequest): Promise<QuoteRequestDto> {
    try {
      return await firstValueFrom(this.http.post<QuoteRequestDto>(`${API}/quotes`, req));
    } catch {
      return await this.mock.createQuote(req);
    }
  }

  async respond(id: string, req: CreateQuoteResponse): Promise<QuoteResponseDto> {
    try {
      return await firstValueFrom(this.http.post<QuoteResponseDto>(`${API}/quotes/${id}/responses`, req));
    } catch {
      return await this.mock.respondQuote(id, req);
    }
  }

  async getResponses(id: string): Promise<QuoteResponseDto[]> {
    try {
      return await firstValueFrom(this.http.get<QuoteResponseDto[]>(`${API}/quotes/${id}/responses`));
    } catch {
      return this.mock.getQuoteResponses(id);
    }
  }
}
