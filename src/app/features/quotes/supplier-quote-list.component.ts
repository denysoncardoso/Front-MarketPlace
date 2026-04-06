import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../shared/components/page-header.component';
import {
  QuoteService,
  QuoteRequestDto,
  CreateQuoteResponse
} from '../../core/services/quote.service';

@Component({
  selector: 'app-supplier-quotes',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent],
  template: `
    <app-page-header title="Solicitações de Cotação" subtitle="Solicitações abertas para você responder" />

    @if (loading()) {
      <div class="text-center py-5"><div class="spinner-border text-primary" role="status"></div></div>
    } @else if (openQuotes().length === 0) {
      <div class="card shadow-sm text-center py-5 text-muted">
        <i class="bi bi-chat-square-quote" style="font-size:2rem"></i>
        <div class="mt-2">Nenhuma solicitação aberta.</div>
      </div>
    } @else {
      <div class="row g-3">
        @for (quote of openQuotes(); track quote.id) {
          <div class="col-sm-6 col-lg-4 col-xl-3">
            <div class="card shadow-sm h-100 d-flex flex-column">
              <div class="card-body d-flex flex-column">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <h6 class="card-title fw-semibold mb-0">{{ quote.productName }}</h6>
                  <span class="badge bg-info-subtle text-info rounded-pill small">Aberta</span>
                </div>
                <p class="text-muted mb-3" style="font-size:0.82rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">{{ quote.description }}</p>
                <div class="mt-auto small text-muted">
                  <div class="mb-1"><i class="bi bi-building me-1"></i>{{ quote.pharmacyId }}</div>
                  <div class="mb-1"><i class="bi bi-box me-1"></i>{{ quote.quantity }} unidades</div>
                  <div><i class="bi bi-calendar3 me-1"></i>{{ quote.createdAt | date:'dd/MM/yyyy' }}</div>
                </div>
                <button (click)="openResponse(quote)" class="btn btn-primary btn-sm mt-3 w-100">
                  <i class="bi bi-reply-all me-1"></i>Responder
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    }

    <!-- Response Modal -->
    @if (showResponseForm() && selectedQuote()) {
      <div class="modal fade show d-block" tabindex="-1" style="background:rgba(0,0,0,0.5)" (click)="showResponseForm.set(false)">
        <div class="modal-dialog modal-dialog-centered" (click)="$event.stopPropagation()">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Responder cotação: {{ selectedQuote()?.productName }}</h5>
              <button type="button" class="btn-close" (click)="showResponseForm.set(false)"></button>
            </div>
            <div class="modal-body">
              <div class="row g-3">
                <div class="col-md-6 form-floating">
                  <input [(ngModel)]="response.unitPrice" type="number" step="0.01" min="0.01" id="respPrice" class="form-control" placeholder="Preço" />
                  <label for="respPrice" class="text-muted">Preço Unitário (R$)</label>
                </div>
                <div class="col-md-6 form-floating">
                  <input [(ngModel)]="response.deliveryDays" type="number" min="1" id="respDays" class="form-control" placeholder="Dias" />
                  <label for="respDays" class="text-muted">Prazo de Entrega (dias)</label>
                </div>
                <div class="col-12 form-floating">
                  <textarea [(ngModel)]="response.notes" class="form-control" id="respNotes" rows="2" placeholder="Obs"></textarea>
                  <label for="respNotes" class="text-muted">Observações</label>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" (click)="showResponseForm.set(false)">Cancelar</button>
              <button type="button" class="btn btn-primary" (click)="submitResponse()">Enviar Proposta</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade show"></div>
    }
  `,
  styles: [``]
})
export class SupplierQuoteListComponent implements OnInit {
  private quoteService = inject(QuoteService);

  quotes = signal<QuoteRequestDto[]>([]);
  response: CreateQuoteResponse = { unitPrice: 0, deliveryDays: 3, notes: '' };
  showResponseForm = signal(false);
  selectedQuote = signal<QuoteRequestDto | null>(null);
  loading = signal(true);

  openQuotes = signal<QuoteRequestDto[]>([]);

  async ngOnInit(): Promise<void> {
    await this.load();
  }

  async load(): Promise<void> {
    this.loading.set(true);
    try {
      const all = await this.quoteService.getQuotes();
      this.quotes.set(all);
      this.openQuotes.set(all.filter(q => q.status === 0));
    } finally {
      this.loading.set(false);
    }
  }

  openResponse(quote: QuoteRequestDto): void {
    this.selectedQuote.set(quote);
    this.response = { unitPrice: 0, deliveryDays: 3, notes: '' };
    this.showResponseForm.set(true);
  }

  async submitResponse(): Promise<void> {
    const q = this.selectedQuote();
    if (!q) return;
    await this.quoteService.respond(q.id, this.response);
    this.showResponseForm.set(false);
    this.selectedQuote.set(null);
    await this.load();
  }
}
