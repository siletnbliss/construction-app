import { Component, Input } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { TuiActionModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import {
  RouterLinkActive,
  RouterLinkWithHref,
  RouterOutlet,
} from '@angular/router';
import { NavLayoutLinksComponent } from '../nav-layout-links/nav-layout-links.component';
import { SideBarComponent } from '../side-bar/side-bar.component';

export interface NavLayoutItem {
  title: string;
  icon: string;
  link: string;
}

@Component({
  selector: 'app-nav-layout',
  standalone: true,
  imports: [NavLayoutLinksComponent, SideBarComponent, RouterOutlet],
  templateUrl: './nav-layout.component.html',
  styleUrl: './nav-layout.component.scss',
})
export class NavLayoutComponent {
  @Input({ required: true })
  items!: NavLayoutItem[];
}
