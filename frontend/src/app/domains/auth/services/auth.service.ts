import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { LoginResponse, UserResponse } from '../models/auth.model';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private storage = inject(StorageService);
  private router = inject(Router);
  private token = signal<string | null>(null);
  private user = signal<UserResponse | null>(null);

  constructor() {
    const response = this.storage.retrieve();
    if (response) {
      this.setCredentials(response);
    }
  }

  private setCredentials(dto: LoginResponse) {
    this.token.set(dto.token);
    this.user.set(dto.user);
  }

  login(dto: { email: string; password: string }) {
    const observable = this.http.post<LoginResponse>(
      `${API_URL}/auth/login`,
      dto
    );
    observable.subscribe({
      next: (res) => {
        this.storage.persist(res.token, res.user);
        this.setCredentials(res);
        if (res.user.context === 'constructor')
          this.router.navigate(['/construction']);
        else this.router.navigate(['/supplier']);
      },
    });
    return observable;
  }

  isLoggedIn = computed(() =>
    !!this.token() && !!this.user() ? this.user()?.context : null
  );

  getToken = computed(() => this.token());

  logout() {
    this.storage.clear();
    this.user.set(null);
    this.token.set(null);
    this.router.navigate(['/login']);
  }
}
