import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, MOCK_USERS } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  isLoading = signal(false);
  error = signal('');

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  async onSubmit(): Promise<void> {
    if (this.form.invalid || this.isLoading()) return;
    this.isLoading.set(true);
    this.error.set('');
    try {
      const value = this.form.getRawValue();
      await this.auth.login({ email: value.email!, password: value.password! });
      this.router.navigate(['/dashboard']);
    } catch (err: unknown) {
      const httpErr = err as { error?: { message?: string } };
      this.error.set(httpErr?.error?.message ?? 'Falha no login. Verifique as credenciais.');
    } finally {
      this.isLoading.set(false);
    }
  }

  async loginAs(role: 'pharmacy' | 'supplier'): Promise<void> {
    this.isLoading.set(true);
    this.error.set('');
    try {
      const user = MOCK_USERS.find(u => u.role.toLowerCase() === role);
      if (!user) return;
      this.form.patchValue({ email: user.email, password: user.password });
      await this.auth.login({ email: user.email, password: user.password });
      this.router.navigate(['/dashboard']);
    } catch {
      this.error.set('Falha ao entrar com conta de demonstração.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
