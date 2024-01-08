import { LogoComponent } from '@/shared/components/logo/logo.component';
import { Component } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { TuiButtonModule } from '@taiga-ui/core';
import { NavLinksComponent } from '../nav-links/nav-links.component';
import { SideBarComponent } from '@/shared/components/side-bar/side-bar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    TuiButtonModule,
    RouterLinkWithHref,
    RouterLinkActive,
    LogoComponent,
    NavLinksComponent,
    SideBarComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
