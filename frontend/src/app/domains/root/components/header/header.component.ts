import { LogoComponent } from '@/shared/components/logo/logo.component';
import { Component } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    TuiButtonModule,
    RouterLinkWithHref,
    RouterLinkActive,
    LogoComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  routes = [
    { name: 'Home', link: '/', exact: true },
    { name: 'About', link: '/about' },
    { name: 'Projects', link: '/projects' },
  ];
}
