import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AppSidebarComponent } from '../components/sidebar.component';
import { AppNavbarComponent } from '../components/navbar.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AppSidebarComponent, AppNavbarComponent],
  template: `
    <div class="app-layout bg-light">
      <app-sidebar />
      <div class="main-content">
        <app-navbar />
        <main class="container-fluid px-4 py-4">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `
})
export class AuthLayoutComponent {}
