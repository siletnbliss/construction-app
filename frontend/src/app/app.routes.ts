import { LayoutComponent } from '@/root/components/layout/layout.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('@/root/pages/landing/landing.component'),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('@/auth/pages/login/login.component'),
  },
];
