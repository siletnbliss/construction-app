import { Component } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { TuiButtonModule, tuiDropdownAnimation } from '@taiga-ui/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [TuiButtonModule, RouterLinkWithHref],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  animations: [tuiDropdownAnimation],
})
export class HeroComponent {}
