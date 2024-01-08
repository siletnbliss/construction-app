import { Injectable } from '@angular/core';
import { LoginResponse, UserResponse } from '../models/auth.model';
import { environment } from '@/environments/environment';

const AUTH_KEY = environment.sessionStorageAuthKey;

const USER_KEY = AUTH_KEY + '-usr';
const TOKEN_KEY = AUTH_KEY + '-tkn';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  persist(token: string, user: UserResponse) {
    window.sessionStorage.setItem(TOKEN_KEY, token);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  retrieve(): LoginResponse | null {
    const user = window.sessionStorage.getItem(USER_KEY);
    const token = window.sessionStorage.getItem(TOKEN_KEY);
    if (!user || !token) return null;
    return {
      token,
      user: JSON.parse(user),
    };
  }

  clear() {
    window.sessionStorage.clear();
  }
}
