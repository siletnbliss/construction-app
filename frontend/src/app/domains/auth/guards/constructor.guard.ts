import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ContructionGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn() === 'constructor') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
