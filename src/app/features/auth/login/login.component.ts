import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  error = '';
  loading = false;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  async onSubmit(): Promise<void> {
    if (this.form.invalid || this.loading) return;
    this.loading = true;
    this.error = '';
    try {
      const value = this.form.getRawValue();
      await this.auth.login({ email: value.email!, password: value.password! });
      if (this.auth.isPharmacy()) {
        this.router.navigate(['/catalog']);
      } else {
        this.router.navigate(['/my-products']);
      }
    } catch (err: unknown) {
      const httpErr = err as { error?: { message?: string }, message?: string };
      this.error = httpErr?.error?.message ?? 'Falha no login. Verifique as credenciais.';
    } finally {
      this.loading = false;
    }
  }
}
