import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { StorageService } from './storage.service';

export interface AuthResponse {
  token: string;
  email: string;
  role: string;
  expiresAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: number;
}

interface AuthState {
  isLoggedIn: boolean;
  email: string;
  role: string;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private storage = inject(StorageService);
  private apiUrl = 'http://localhost:5000/api';
  private state = signal<AuthState>({
    isLoggedIn: false,
    email: '',
    role: '',
    token: ''
  });

  readonly isLoggedIn = computed(() => this.state().isLoggedIn);
  readonly userEmail = computed(() => this.state().email);
  readonly userRole = computed(() => this.state().role);

  constructor() {
    const token = this.storage.get('token');
    const email = this.storage.get('email');
    const role = this.storage.get('role');
    if (token && email && role) {
      this.state.set({ isLoggedIn: true, email, role, token });
    }
  }

  async login(login: LoginRequest): Promise<void> {
    const response = await firstValueFrom(
      this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, login)
    );
    this.saveSession(response);
  }

  async register(register: RegisterRequest): Promise<void> {
    const response = await firstValueFrom(
      this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, register)
    );
    this.saveSession(response);
  }

  logout(): void {
    this.storage.remove('token');
    this.storage.remove('email');
    this.storage.remove('role');
    this.state.set({ isLoggedIn: false, email: '', role: '', token: '' });
    this.router.navigate(['/login']);
  }

  isPharmacy(): boolean {
    return this.userRole() === 'Pharmacy';
  }

  isSupplier(): boolean {
    return this.userRole() === 'Supplier';
  }

  hasRole(...roles: string[]): boolean {
    return roles.includes(this.userRole());
  }

  private saveSession(response: AuthResponse): void {
    this.storage.set('token', response.token);
    this.storage.set('email', response.email);
    this.storage.set('role', response.role);
    this.state.set({
      isLoggedIn: true,
      email: response.email,
      role: response.role,
      token: response.token
    });
  }
}
