import { Component, Input, signal } from '@angular/core';
import { TuiSidebarModule } from '@taiga-ui/addon-mobile';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [TuiSidebarModule, TuiActiveZoneModule, TuiButtonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  open = signal(false);

  @Input()
  direction: 'right' | 'left' = 'right';

  toggle(value: boolean) {
    this.open.set(value);
  }
}
