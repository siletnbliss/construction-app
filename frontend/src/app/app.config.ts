import { provideAnimations } from '@angular/platform-browser/animations';
import { TuiRootModule } from '@taiga-ui/core';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
} from '@angular/router';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  authInterceptor,
  logoutInterceptor,
} from '@/auth/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withPreloading(PreloadAllModules)
    ),
    importProvidersFrom(TuiRootModule),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor, logoutInterceptor])
    ),
  ],
};
