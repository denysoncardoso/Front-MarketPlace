import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="main-navbar px-4 d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center gap-2">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0 small">
            @for (crumb of breadcrumbs(); track $index) {
              @if ($last) {
                <li class="breadcrumb-item active fw-semibold">{{ crumb.label }}</li>
              } @else {
                <li class="breadcrumb-item">{{ crumb.label }}</li>
              }
            }
          </ol>
        </nav>
      </div>
      <div class="d-flex align-items-center gap-3">
        <a [routerLink]="'/cart'" class="position-relative text-secondary" style="font-size:1.2rem">
          <i class="bi bi-cart3"></i>
          @if (cartCount() > 0) {
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style="font-size:0.6rem">{{ cartCount() }}</span>
          }
        </a>
        <button class="btn btn-link text-secondary position-relative p-0 border-0" style="font-size:1.2rem">
          <i class="bi bi-bell"></i>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style="font-size:0.6rem">3</span>
        </button>
        <div class="dropdown">
          <button class="btn btn-link text-decoration-none d-flex align-items-center gap-2 p-0 border-0"
                  data-bs-toggle="dropdown">
            <div class="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center"
                 style="width:34px;height:34px">
              <i class="bi bi-person text-primary small"></i>
            </div>
          </button>
          <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0 small">
            <li><span class="dropdown-item-text fw-semibold">{{ userEmail() }}</span></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item small" href="#"><i class="bi bi-person me-2"></i>Perfil</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item small text-danger" (click)="logout()">
              <i class="bi bi-box-arrow-left me-2"></i>Sair
            </a></li>
          </ul>
        </div>
      </div>
    </nav>
  `
})
export class AppNavbarComponent {
  private auth = inject(AuthService);
  private cart = inject(CartService);
  private router = inject(Router);

  userEmail = this.auth.userEmail;

  cartCount = computed(() => this.cart.cartItems().length);

  breadcrumbs = computed(() => {
    const url = this.router.url;
    const parts = url.split('/').filter(Boolean);
    const crumbs: { label: string }[] = [{ label: 'Home' }];
    const labels: Record<string, string> = {
      dashboard: 'Dashboard',
      catalog: 'CatÃ¡logo',
      cart: 'Carrinho',
      'my-products': 'Meus Produtos',
      'my-orders': 'Meus Pedidos',
      quotes: 'CotaÃ§Ãµes'
    };
    for (const p of parts) {
      const last = crumbs[crumbs.length - 1];
      if (last.label === 'Home') crumbs.pop();
      crumbs.push({ label: labels[p] ?? p });
    }
    if (crumbs.length === 0) crumbs.push({ label: 'Home' });
    return crumbs;
  });

  logout(): void {
    this.auth.logout();
  }
}
