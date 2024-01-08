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
  },
  {
    path: 'login',
    loadComponent: () => import('@/auth/pages/login/login.component'),
  },
  {
    path: 'construction',
    component: ConstructorLayoutComponent,
    canActivate: [ContructionGuard],
    children: [],
  },
  {
    path: 'supplier',
    component: SupplierLayoutComponent,
    canActivate: [SupplierGuard],
    children: [],
  },
];
