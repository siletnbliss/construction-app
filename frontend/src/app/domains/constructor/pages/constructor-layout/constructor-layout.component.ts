import {
  NavLayoutComponent,
  NavLayoutItem,
} from '@/shared/components/nav-layout/nav-layout.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-constructor-layout',
  standalone: true,
  imports: [NavLayoutComponent],
  templateUrl: './constructor-layout.component.html',
  styleUrl: './constructor-layout.component.scss',
})
export class ConstructorLayoutComponent {
  items: NavLayoutItem[] = [
    {
      title: 'Dashboard',
      icon: 'tuiIconHomeLarge',
      link: '/construction',
    },
  ];
}
