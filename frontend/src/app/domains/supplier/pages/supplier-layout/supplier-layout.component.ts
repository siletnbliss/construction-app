import { NavLayoutItem } from '@/shared/components/nav-layout-links/nav-layout-links.component';
import { NavLayoutComponent } from '@/shared/components/nav-layout/nav-layout.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-supplier-layout',
  standalone: true,
  imports: [NavLayoutComponent],
  templateUrl: './supplier-layout.component.html',
  styleUrl: './supplier-layout.component.scss',
})
export class SupplierLayoutComponent {
  items: NavLayoutItem[] = [
    {
      title: 'Dashboard',
      icon: 'tuiIconHomeLarge',
      link: '/supplier',
    },
  ];
}
