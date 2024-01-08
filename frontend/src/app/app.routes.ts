import { ContructionGuard } from '@/auth/guards/constructor.guard';
import { SupplierGuard } from '@/auth/guards/supplier.guard';
import { ConstructorLayoutComponent } from '@/constructor/pages/constructor-layout/constructor-layout.component';
import { LayoutComponent } from '@/root/components/layout/layout.component';
import { SupplierLayoutComponent } from '@/supplier/pages/supplier-layout/supplier-layout.component';
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
    title: 'Marble Space',
  },
  {
    path: 'login',
    title: 'Marble Space - Login',
    loadComponent: () => import('@/auth/pages/login/login.component'),
  },
  {
    path: 'construction',
    title: 'Marble Space - Constructor',
    component: ConstructorLayoutComponent,
    canActivate: [ContructionGuard],
    children: [],
  },
  {
    path: 'supplier',
    title: 'Marble Space - Supplier',
    component: SupplierLayoutComponent,
    canActivate: [SupplierGuard],
    children: [],
  },
];
