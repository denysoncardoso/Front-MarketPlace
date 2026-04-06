import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

type DeltaType = 'up' | 'down' | 'neutral';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card shadow-sm">
      <div class="card-body d-flex align-items-center gap-3 p-3">
        <div class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
             [ngClass]="iconBg()" style="width:44px;height:44px">
          <i class="bi {{ icon() }}" [ngClass]="iconColor()"></i>
        </div>
        <div>
          <div class="text-muted small">{{ label() }}</div>
          <div class="fs-4 fw-bold lh-sm">{{ value() }}</div>
          @if (delta()) {
            <div class="small d-flex align-items-center gap-1" [ngClass]="deltaColor()">
              @if (deltaType() === 'up') {
                <i class="bi bi-arrow-up-right"></i>
              } @else if (deltaType() === 'down') {
                <i class="bi bi-arrow-down-right"></i>
              } @else {
                <i class="bi bi-dash"></i>
              }
              <span>{{ delta() }}</span>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class StatCardComponent {
  icon = input.required<string>();
  label = input.required<string>();
  value = input.required<string | number>();
  delta = input<string>();
  deltaType = input<DeltaType | undefined>(undefined);

  iconBg = () => {
    const c = this.deltaType();
    if (c === 'up') return 'bg-success bg-opacity-10';
    if (c === 'down') return 'bg-danger bg-opacity-10';
    return 'bg-secondary bg-opacity-10';
  };

  iconColor = () => {
    const c = this.deltaType();
    if (c === 'up') return 'text-success';
    if (c === 'down') return 'text-danger';
    return 'text-secondary';
  };

  deltaColor = () => {
    const c = this.deltaType();
    if (c === 'up') return 'text-success';
    if (c === 'down') return 'text-danger';
    return 'text-secondary';
  };
}
