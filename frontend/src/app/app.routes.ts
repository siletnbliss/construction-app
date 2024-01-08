import { LayoutComponent } from '@/root/components/layout/layout.component';
import { LandingComponent } from '@/root/pages/landing/landing.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: LandingComponent,
      },
    ],
  },
];
