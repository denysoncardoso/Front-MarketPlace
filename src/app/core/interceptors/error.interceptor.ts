import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const storage = inject(StorageService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        storage.remove('token');
        storage.remove('email');
        storage.remove('role');
        router.navigate(['/login']);
      }
      if (error.status === 500) {
        console.error('Server error:', error.error);
      }
      return throwError(() => error);
    })
  );
};
