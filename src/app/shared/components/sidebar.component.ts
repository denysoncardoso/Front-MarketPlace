import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

interface NavLink {
  icon: string;
  label: string;
  path: string;
  section?: 'pharmacy' | 'supplier';
}

const ALL_LINKS: NavLink[] = [
  { icon: 'bi-grid-3x3-gap-fill', label: 'Dashboard', path: '/dashboard', section: 'pharmacy' },
  { icon: 'bi-grid-3x3-gap-fill', label: 'Dashboard', path: '/dashboard', section: 'supplier' },
  { icon: 'bi-bag', label: 'CatÃ¡logo', path: '/catalog' },
  { icon: 'bi-box-seam', label: 'Meus Produtos', path: '/my-products', section: 'supplier' },
  { icon: 'bi-cart3', label: 'Carrinho', path: '/cart' },
  { icon: 'bi-receipt', label: 'Meus Pedidos', path: '/my-orders', section: 'pharmacy' },
  { icon: 'bi-box-arrow-up', label: 'Pedidos Recebidos', path: '/my-orders', section: 'supplier' },
  { icon: 'bi-chat-square-quote', label: 'CotaÃ§Ãµes', path: '/quotes' },
];

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar d-flex flex-column">
      <a class="sidebar-brand border-bottom border-secondary border-opacity-25" routerLink="/dashboard">
        <i class="bi bi-capsule me-2"></i>PharmaB2B
      </a>
      <nav class="flex-grow-1 py-3">
        @for (link of links; track link.path) {
          @if (link.section) {
            @if (link.section === currentSection()) {
              <a [routerLink]="link.path"
                 routerLinkActive="active"
                 [routerLinkActiveOptions]="{ exact: true }"
                 class="nav-link d-flex align-items-center">
                <i class="bi {{ link.icon }}"></i>{{ link.label }}
              </a>
            }
          } @else {
            <a [routerLink]="link.path"
               routerLinkActive="active"
               [routerLinkActiveOptions]="{ exact: false }"
               class="nav-link d-flex align-items-center">
              <i class="bi {{ link.icon }}"></i>{{ link.label }}
            </a>
          }
        }
      </nav>
      <div class="p-3 border-top border-secondary border-opacity-25">
        <div class="d-flex align-items-center gap-3">
          <div class="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center"
               style="width:36px;height:36px">
            <i class="bi bi-person text-primary"></i>
          </div>
          <div class="text-white">
            <div class="small fw-semibold">{{ userEmail() }}</div>
            <div class="text-white-50" style="font-size:0.75rem">{{ currentSection() === 'pharmacy' ? 'FarmÃ¡cia' : 'Fornecedor' }}</div>
          </div>
        </div>
      </div>
    </aside>
  `
})
export class AppSidebarComponent {
  private auth = inject(AuthService);
  links = ALL_LINKS;

  currentSection(): string {
    return this.auth.isPharmacy() ? 'pharmacy' : 'supplier';
  }

  userEmail(): string {
    return this.auth.userEmail() || 'UsuÃ¡rio';
  }
}
