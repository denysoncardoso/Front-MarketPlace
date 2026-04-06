import { Component, input, output, AfterViewInit, OnDestroy, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal fade" tabindex="-1" #modalEl>
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title() }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <p class="mb-0">{{ message() }}</p>
          </div>
          @if (showing()) {
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" (click)="onCancel()">Cancelar</button>
              <button type="button" [ngClass]="danger() ? 'btn btn-danger' : 'btn btn-primary'"
                      (click)="onConfirm()">{{ confirmLabel() }}</button>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class ConfirmModalComponent implements AfterViewInit, OnDestroy {
  title = input('ConfirmaÃ§Ã£o');
  message = input('');
  confirmLabel = input('Confirmar');
  danger = input(false);

  confirmed = output<void>();
  cancelled = output<void>();

  showing = input(false);

  private el = inject(ElementRef);
  private bsModal: bootstrap.Modal | null = null;

  ngAfterViewInit(): void {
    const el = this.el.nativeElement.querySelector('.modal');
    if (el) {
      this.bsModal = new bootstrap.Modal(el);
      el.addEventListener('hidden.bs.modal', () => this.cancelled.emit());
    }
  }

  ngOnDestroy(): void {
    this.bsModal?.dispose();
  }

  show(): void {
    this.bsModal?.show();
  }

  onConfirm(): void {
    this.confirmed.emit();
    this.bsModal?.hide();
  }

  onCancel(): void {
    this.cancelled.emit();
    this.bsModal?.hide();
  }
}
