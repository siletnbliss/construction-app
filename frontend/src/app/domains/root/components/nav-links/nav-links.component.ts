import { Component } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
  selector: 'app-nav-links',
  standalone: true,
  imports: [RouterLinkWithHref, RouterLinkActive, TuiButtonModule],
  templateUrl: './nav-links.component.html',
  styleUrl: './nav-links.component.scss',
})
export class NavLinksComponent {
  routes = [
    { name: 'Home', link: '/', exact: true },
    { name: 'About', link: '/about' },
    { name: 'Projects', link: '/projects' },
  ];
}
