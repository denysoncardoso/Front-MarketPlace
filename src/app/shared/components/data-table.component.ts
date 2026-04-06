import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Column {
  key: string;
  label: string;
  class?: string;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card shadow-sm">
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead>
            <tr>
              @for (col of columns(); track col.key) {
                <th [class]="col.class">{{ col.label }}</th>
              }
            </tr>
          </thead>
          <tbody>
            @if (loading()) {
              @for (_ of skeletonRows(); track $index) {
                <tr>
                  @for (col of columns(); track col.key) {
                    <td><span class="placeholder col-10 bg-secondary" style="height:14px"></span></td>
                  }
                </tr>
              }
            } @else if (data().length === 0) {
              <tr>
                <td [attr.colspan]="columns().length" class="text-center py-5 text-muted">
                  <i class="bi bi-inbox" style="font-size:2rem"></i>
                  <div class="mt-2">Nenhum dado encontrado</div>
                </td>
              </tr>
            } @else {
              <ng-content select="[tableBody]"></ng-content>
            }
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class DataTableComponent {
  columns = input.required<Column[]>();
  data = input.required<any[]>();
  loading = input<boolean>(false);
  skeletonRows = () => Array(5).fill(null);
}
