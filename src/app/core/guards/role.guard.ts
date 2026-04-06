import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export function supplierGuard(): CanActivateFn {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    if (!auth.isSupplier()) {
      router.navigate(['/']);
      return false;
    }
    return true;
  };
}

export function pharmacyGuard(): CanActivateFn {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    if (!auth.isPharmacy()) {
      router.navigate(['/']);
      return false;
    }
    return true;
  };
}
