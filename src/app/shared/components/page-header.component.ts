import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header d-flex justify-content-between align-items-center">
      <div>
        <h1 class="h4 fw-bold mb-0">{{ title() }}</h1>
        @if (subtitle()) {
          <p class="text-muted small mb-0 mt-1">{{ subtitle() }}</p>
        }
      </div>
      <ng-content></ng-content>
    </div>
  `
})
export class PageHeaderComponent {
  title = input.required<string>();
  subtitle = input<string>('');
}
