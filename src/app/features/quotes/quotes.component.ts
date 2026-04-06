import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../shared/components/page-header.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge.component';
import { AuthService } from '../../core/services/auth.service';
import {
  QuoteService,
  QuoteRequestDto,
  QuoteResponseDto,
  CreateQuoteRequest,
  CreateQuoteResponse,
  QUOTE_STATUS_LABELS
} from '../../core/services/quote.service';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, StatusBadgeComponent],
  templateUrl: './quotes.component.html'
})
export class QuotesComponent implements OnInit {
  private quoteService = inject(QuoteService);
  auth = inject(AuthService);

  quotes = signal<QuoteRequestDto[]>([]);
  loading = signal(true);
  showForm = signal(false);
  responses = signal<QuoteResponseDto[]>([]);
  selectedQuote = signal<QuoteRequestDto | null>(null);
  showResponseForm = signal(false);

  newItem: CreateQuoteRequest = { productName: '', quantity: 1, description: '' };
  newResponse: CreateQuoteResponse = { unitPrice: 0, deliveryDays: 3, notes: '' };

  async ngOnInit(): Promise<void> {
    await this.load();
  }

  async load(): Promise<void> {
    this.loading.set(true);
    try {
      this.quotes.set(await this.quoteService.getQuotes());
    } finally {
      this.loading.set(false);
    }
  }

  async createQuote(): Promise<void> {
    if (!this.newItem.productName) return;
    const req: CreateQuoteRequest = {
      productName: this.newItem.productName,
      quantity: this.newItem.quantity,
      description: this.newItem.description
    };
    await this.quoteService.create(req);
    this.newItem = { productName: '', quantity: 1, description: '' };
    this.showForm.set(false);
    await this.load();
  }

  async openResponse(quote: QuoteRequestDto): Promise<void> {
    this.selectedQuote.set(quote);
    this.newResponse = { unitPrice: 0, deliveryDays: 3, notes: '' };
    this.showResponseForm.set(true);
  }

  async submitResponse(): Promise<void> {
    const q = this.selectedQuote();
    if (!q) return;
    await this.quoteService.respond(q.id, this.newResponse);
    this.showResponseForm.set(false);
    this.selectedQuote.set(null);
    await this.load();
  }

  async viewResponses(quote: QuoteRequestDto): Promise<void> {
    this.selectedQuote.set(quote);
    this.responses.set(await this.quoteService.getResponses(quote.id));
  }

  label(s: number): string {
    return QUOTE_STATUS_LABELS[s] ?? 'Desconhecido';
  }

  toStatusType(s: number): string {
    const map: Record<number, string> = { 0: 'OPEN', 1: 'ANSWERED', 2: 'APPROVED' };
    return map[s] ?? 'PENDING';
  }
}
