import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

type StatusType = 'PENDING' | 'APPROVED' | 'SHIPPED' | 'OPEN' | 'ANSWERED';

const STATUS_MAP: Record<StatusType, { class: string; label: string }> = {
  PENDING:   { class: 'bg-warning-subtle text-warning', label: 'Pendente' },
  APPROVED:  { class: 'bg-success-subtle text-success', label: 'Aprovado' },
  SHIPPED:   { class: 'bg-primary-subtle text-primary', label: 'Enviado' },
  OPEN:      { class: 'bg-info-subtle text-info', label: 'Aberto' },
  ANSWERED:  { class: 'bg-secondary-subtle text-secondary', label: 'Respondido' },
};

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="badge rounded-pill px-2 py-1" [ngClass]="badgeClass()">
      {{ statusLabel() }}
    </span>
  `
})
export class StatusBadgeComponent {
  status = input.required<StatusType | string>();

  badgeClass = computed(() => {
    const s = this.status();
    const mapped = STATUS_MAP[s as StatusType];
    return mapped ? mapped.class : 'bg-light text-dark';
  });

  statusLabel = computed(() => {
    const s = this.status();
    const mapped = STATUS_MAP[s as StatusType];
    return mapped ? mapped.label : s;
  });
}
