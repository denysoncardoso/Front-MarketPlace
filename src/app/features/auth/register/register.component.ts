import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  isLoading = signal(false);
  error = signal('');

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    role: ['0', [Validators.required]]
  });

  get passwordMismatch(): boolean {
    const p = this.form.get('password');
    const c = this.form.get('confirmPassword');
    return !!(p && c && p.value !== c.value) && (c?.touched ?? false);
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid || this.isLoading()) return;
    this.isLoading.set(true);
    this.error.set('');
    try {
      const v = this.form.getRawValue();
      await this.auth.register({
        name: v.name!,
        email: v.email!,
        password: v.password!,
        role: parseInt(v.role!, 10)
      });
      this.router.navigate(['/dashboard']);
    } catch (err: unknown) {
      const httpErr = err as { error?: { message?: string } };
      this.error.set(httpErr?.error?.message ?? 'Falha no registro. Tente novamente.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
