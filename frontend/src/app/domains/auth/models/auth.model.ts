export interface LoginResponse {
  token: string;
  user: UserResponse;
}

export interface UserResponse {
  id: string;
  context: 'provider' | 'constructor';
  email: string;
}
