import { Application } from '@/shared/models/application';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TuiSvgModule } from '@taiga-ui/core';
import { TuiIslandModule } from '@taiga-ui/kit';

@Component({
  selector: 'app-application-detail',
  standalone: true,
  imports: [TuiIslandModule, TuiSvgModule, CommonModule],
  templateUrl: './application-detail.component.html',
  styleUrl: './application-detail.component.scss',
})
export class ApplicationDetailComponent {
  @Input({ required: true })
  application!: Application;
}
