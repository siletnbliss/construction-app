import { AuthService } from '@/auth/services/auth.service';
import { LogoComponent } from '@/shared/components/logo/logo.component';
import { parseHttpError } from '@/shared/utils/parse-http-error';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLinkWithHref } from '@angular/router';
import {
  TuiButtonModule,
  TuiErrorModule,
  tuiDropdownAnimation,
} from '@taiga-ui/core';
import {
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPasswordModule,
} from '@taiga-ui/kit';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    TuiButtonModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    LogoComponent,
    RouterLinkWithHref,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [tuiDropdownAnimation],
})
export default class LoginComponent {
  private authService = inject(AuthService);
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  error = signal<string | null>(null);
  loading = signal(false);
  handleSubmit() {
    this.error.set(null);
    this.loading.set(true);
    if (!this.form.valid) return;
    const { email, password } = this.form.value;
    if (!email || !password) return;

    this.authService.login({ email, password }).subscribe({
      next: () => {
        this.loading.set(false);
      },
      error: (err) => {
        const parsedError = parseHttpError(err, { 401: 'Invalid Credentials' });
        this.error.set(parsedError);
        this.loading.set(false);
      },
    });
  }
}
