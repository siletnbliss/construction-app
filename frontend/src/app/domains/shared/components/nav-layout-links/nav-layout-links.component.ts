import { Component, Input } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { TuiActionModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';

export interface NavLayoutItem {
  title: string;
  icon: string;
  link: string;
}

@Component({
  selector: 'app-nav-layout-links',
  standalone: true,
  imports: [
    LogoComponent,
    TuiSvgModule,
    TuiButtonModule,
    RouterLinkActive,
    RouterLinkWithHref,
  ],
  templateUrl: './nav-layout-links.component.html',
  styleUrl: './nav-layout-links.component.scss',
})
export class NavLayoutLinksComponent {
  @Input({ required: true })
  items!: NavLayoutItem[];
}
