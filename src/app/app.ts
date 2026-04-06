import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';

interface NavLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  auth = inject(AuthService);
  router = inject(Router);
  isLoggedIn = this.auth.isLoggedIn;
  userRole = this.auth.userRole;
  username = this.auth.userEmail;

  logout(): void {
    this.auth.logout();
  }

  get navLinks(): NavLink[] {
    if (!this.isLoggedIn()) return [];
    const links: NavLink[] = [];
    links.push({ label: 'Catálogo', path: '/catalog' });
    if (this.auth.isSupplier()) {
      links.push({ label: 'Meus Produtos', path: '/my-products' });
    }
    if (this.auth.isPharmacy()) {
      links.push({ label: 'Meus Pedidos', path: '/my-orders' });
      links.push({ label: 'Cotações', path: '/quotes' });
    }
    if (this.auth.isSupplier()) {
      links.push({ label: 'Cotações', path: '/quotes' });
    }
    links.push({ label: 'Carrinho', path: '/cart' });
    return links;
  }
}
