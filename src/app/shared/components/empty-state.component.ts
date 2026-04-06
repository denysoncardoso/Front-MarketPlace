import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-center py-5 px-4">
      <i [class]="icon()" style="font-size:3rem" class="text-muted d-block mb-3"></i>
      <h5 class="fw-semibold mb-1">{{ title() }}</h5>
      <p class="text-muted small mb-3" style="max-width:400px;margin:0 auto">{{ description() }}</p>
      @if (ctaLabel()) {
        <button class="btn btn-primary px-4" (click)="cta.emit()">{{ ctaLabel() }}</button>
      }
    </div>
  `
})
export class EmptyStateComponent {
  icon = input('bi-inbox');
  title = input.required<string>();
  description = input<string>('');
  ctaLabel = input<string>('');

  cta = output<void>();
}
