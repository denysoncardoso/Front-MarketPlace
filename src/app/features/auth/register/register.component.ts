import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  error = '';
  loading = false;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['0', [Validators.required]]
  });

  async onSubmit(): Promise<void> {
    if (this.form.invalid || this.loading) return;
    this.loading = true;
    this.error = '';
    try {
      const v = this.form.getRawValue();
      await this.auth.register({
        name: v.name!,
        email: v.email!,
        password: v.password!,
        role: parseInt(v.role!, 10)
      });
      this.router.navigate(['/catalog']);
    } catch (err: unknown) {
      const httpErr = err as { error?: { message?: string } };
      this.error = httpErr?.error?.message ?? 'Falha no registro. Tente novamente.';
    } finally {
      this.loading = false;
    }
  }
}
