import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable, tap } from 'rxjs';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const authToken = inject(AuthService).getToken();
  if (!authToken) return next(req);
  const reqWithHeader = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${authToken}`),
  });

  return next(reqWithHeader);
}

export function logoutInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        if (event.status === 401) {
          authService.logout();
        }
      }
    })
  );
}
